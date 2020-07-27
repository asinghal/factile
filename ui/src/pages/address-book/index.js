import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getAddressbook, saveAddressbook} from "./api";
import './address-book.css';

export default function Addressbook() {
    const [ addressbook, setAddressbook ] = useState({});
    const [ selectedGroup, setSelectedGroup ] = useState({});
    const history = useHistory();

    useEffect(() => {
        getAddressbook().then(setAddressbook).catch(e => history.replace('/'));
    }, [history]);

    const deleteContact = (event, groupName, contactIndex) => {
        event.preventDefault();
        const group = addressbook.groups.find(g => g.name === groupName);
        if (group) {
            group.addresses.splice(contactIndex, 1);
            setAddressbook({...addressbook});
            saveAddressbook(addressbook).catch(e => history.replace('/'));
        }
    };

    const updateGroupName = (event, groupName) => {
        event.persist();
        const group = addressbook.groups.find(g => g.name === groupName);
        if (group) {
            group.name = event.target.value;
            setAddressbook({...addressbook});
        }
    };

    const updateContact = (event, groupName, contactIndex) => {
        event.persist();
        const group = addressbook.groups.find(g => g.name === groupName);
        if (group) {
            group.addresses[contactIndex][event.target.name] = event.target.value;
            setAddressbook({...addressbook});
        }
    };

    const saveChanges = (event) => {
        event.preventDefault();
        saveAddressbook(addressbook).catch(e => history.replace('/'));
    };

    const addAddress = (event, groupName) => {
        event.preventDefault();
        const group = addressbook.groups.find(g => g.name === groupName);
        if (group) {
            group.addresses.push({name: '', email: ''});
            setAddressbook({...addressbook});
        }
    };

    const selectGroup = (event) => {
        event.persist();
        if (!event.target.value) {
            setSelectedGroup({});
        } else {
            setSelectedGroup(addressbook.groups.find(g => g.name === event.target.value));
        }
    };

    const addGroup = (event) => {
        event.preventDefault();
        const newGroup = {name: 'Group name', addresses: []};
        addressbook.groups.push(newGroup);
        setAddressbook({...addressbook});
        setSelectedGroup(newGroup);
    };

    return (
        <div className="container address-book">
            <div className="row">
                <div className="col-12">
                    <h1>Address Book</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <button className="base-btn submit-btn" onClick={saveChanges}>Save</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2><i className="fas fa-chevron-circle-right"></i>&nbsp;Your Address Groups</h2>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-12 col-md-6">
                    <select className="form-field" onChange={selectGroup}>
                        <option value="">Your groups</option>
                        { addressbook && addressbook.groups && addressbook.groups.map((group, index) =>
                            <option value={group.name} key={"group-name-" + index}>{group.name}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <button className="base-btn submit-btn" onClick={addGroup}>Add New Group</button>
                </div>
            </div>
            { selectedGroup && !!selectedGroup.name && 
            <div className="form-group address-group">
                <div className="row">
                    <div className="col-12">
                        <h2><i className="fas fa-chevron-circle-right"></i>&nbsp;{'"' + selectedGroup.name + '"  Details'}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3><input type="text" value={selectedGroup.name} className="form-field" onChange={(event) => updateGroupName(event, selectedGroup.name)}/></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4"><strong>Contact name</strong></div>
                    <div className="col-7"><strong>E-mail</strong></div>
                    <div className="col-1">&nbsp;</div>
                </div>
                {selectedGroup.addresses && selectedGroup.addresses.map((contact, i) =>
                <div className="row" key={'group-contact-' + i}>
                    <div className="col-4"><input type="text" name="name" value={contact.name} placeholder="Name" className="form-field" onChange={(event) => updateContact(event, selectedGroup.name, i)} /></div>
                    <div className="col-7"><input type="text" name="email" value={contact.email} placeholder="E-mail address" className="form-field" onChange={(event) => updateContact(event, selectedGroup.name, i)} /></div>
                    <div className="col-1">
                        <a href="#" onClick={(event) => deleteContact(event, selectedGroup.name, i)} title="Delete"><i className="fas fa-times"></i></a>
                    </div>
                </div>
                )}
                <div className="row">
                    <div className="col-12 col-md-6">
                        <button className="base-btn submit-btn" onClick={(event) => addAddress(event, selectedGroup.name)}>Add Contact To Group</button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};
