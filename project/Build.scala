import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "factile"
    val appVersion      = "1.0-SNAPSHOT"
    val casbah = "com.mongodb.casbah" %% "casbah" % "2.1.5-1"
    val specs2 = "org.specs2" %% "specs2" % "1.9" % "test"
    val javamail = "javax.mail" % "mail" % "1.4.5"
    val rabbit = "com.rabbitmq" % "amqp-client" % "2.8.2"
    val akka = "com.typesafe.akka" % "akka-actor" % "2.0.1"
    val apache_poi = "org.apache.poi" % "poi" % "3.8"
    val apache_poi_ooxml = "org.apache.poi" % "poi-ooxml" % "3.8"
    val war_plugin = "com.github.play2war" %% "play2-war-core" % "0.3.1"
    val pdf = "pdf" % "pdf_2.9.1" % "0.3.1"

    val appDependencies = Seq(
      // Add your project dependencies here,
      casbah, specs2, javamail, rabbit, akka, apache_poi, apache_poi_ooxml, war_plugin, pdf
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = SCALA).settings(
      // Add your own project settings here      
    resolvers ++= Seq("Play2war plugins release" at "http://repository-play-war.forge.cloudbees.com/release/",
                      "My Local Play Repository" at "file:///Users/asinghal/play-2.0/framework/../repository/local/")
    )

    resolvers ++= Seq("snapshots" at "http://oss.sonatype.org/content/repositories/snapshots",
                    "releases"  at "http://oss.sonatype.org/content/repositories/releases")
}
