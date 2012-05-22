/*
 * Mailer.scala
 * 
 * Copyright (c) 2012, Aishwarya Singhal. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301  USA
 */
package helpers

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import akka.actor._

object Mailer {
  lazy val config = play.Play.application.configuration
	lazy val host = config.getString("rabbitmq.host")
	lazy val queue = config.getString("rabbitmq.queue")
	lazy val exchange = config.getString("rabbitmq.exchange")

	val authenticator = new javax.mail.Authenticator() {
		override def getPasswordAuthentication = {
			new PasswordAuthentication("factilenet","AllFacts4U");
		}
	}
	
	val props = new Properties();
	props.put("mail.smtp.host", "smtp.gmail.com");
	props.put("mail.smtp.socketFactory.port", "465");
	props.put("mail.smtp.socketFactory.class",
			"javax.net.ssl.SSLSocketFactory");
	props.put("mail.smtp.auth", "true");
	props.put("mail.smtp.port", "465");

	val session = Session.getDefaultInstance(props, authenticator);

	/**
	 * Sends emails to the gives addresses
	 *
	 * @param toAddress 
	 * @param fromAddress
	 * @param subject
	 * @param body
	 */
	def send(toAddress: String, fromAddress: String, subject: String, body: String, html: Boolean = false) = {
		MailPublisher.send((new Email(toAddress, fromAddress, subject, body, html)).xml);
	}
}

object MailPublisher {
	import com.rabbitmq.client.ConnectionFactory;
	import com.rabbitmq.client.Connection;
	import com.rabbitmq.client.Channel;
  val system = ActorSystem("mailer")

	val dispatcher = system.actorOf(Props(new MailDispatcher))

  val factory = new ConnectionFactory();
  factory.setHost(Mailer.host);


	def send(message: String) = {
    val connection = factory.newConnection();
    val channel = connection.createChannel();

    channel.queueDeclare(Mailer.queue, false, false, false, null);
    try {
	    channel.basicPublish("", Mailer.queue, null, message.getBytes());
    } finally {
	    channel.close();
	    connection.close();	
  	}
  }

}

class MailDispatcher extends Actor {
	import com.rabbitmq.client.ConnectionFactory;
	import com.rabbitmq.client.Connection;
	import com.rabbitmq.client.Channel;
	import com.rabbitmq.client.QueueingConsumer;
	import scala.xml._

	val factory = new ConnectionFactory();
  factory.setHost(Mailer.host);
  val connection = factory.newConnection();
  val channel = connection.createChannel();

  channel.queueDeclare(Mailer.queue, false, false, false, null);
  
  val consumer = new QueueingConsumer(channel);
  channel.basicConsume(Mailer.queue, true, consumer);
  
  while (true) {
    val delivery = consumer.nextDelivery();
    val message = new String(delivery.getBody());
    val xml = XML.loadString(message)
    val toAddress = (xml \\ "toAddress").text
    val fromAddress = (xml \\ "fromAddress").text
    val subject = (xml \\ "subject").text
    val body = (xml \\ "body").text
    val html = (xml \\ "isHtml").text.toBoolean
    dispatch(toAddress, fromAddress, subject, body, html)
  }

  def dispatch(toAddress: String, fromAddress: String, subject: String, body: String, html: Boolean) {
    try {
			val message = new MimeMessage(Mailer.session);
			message.setFrom(new InternetAddress(fromAddress));
			message.setRecipients(Message.RecipientType.TO, toAddress);
			message.setSubject(subject);
			if (html) {
				message.setContent(body, "text/html")
			} else {
			  message.setText(body);
			}
 
			Transport.send(message); 
		} catch {
			case e: MessagingException =>
			  throw new RuntimeException(e);
		}
  }

	def receive = { case _ => }
}

case class Email(toAddress: String, fromAddress: String, subject: String, body: String, html: Boolean) {
	def xml = { "<email><toAddress>%s</toAddress><fromAddress>%s</fromAddress><subject><![CDATA[%s]]></subject><body><![CDATA[%s]]></body><isHtml>%s</isHtml></email>".format(toAddress, fromAddress, subject, body, html) }
}
