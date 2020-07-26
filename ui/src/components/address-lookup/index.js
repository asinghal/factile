import React, { useState, useEffect } from "react";

import './address-lookup.css';

export default function AddressLookup({ addressbook, close, onSubmit }) {
    const [ filteredAddressBook, setFilteredAddressBook ] = useState({});
    const [ selectedAddresses, setSelectedAddresses ] = useState([]);
    const Search = (event) => {
        if (!addressbook || !addressbook.groups) {
            return;
        }
        const matches = (text) => text.indexOf(event.target.value) !== -1;
        const filtered = addressbook.groups.map(group => ({
            name: group.name,
            addresses: (group.addresses || []).filter(contact => matches(contact.name) || matches(contact.email))
        })).filter(group => !!group.addresses.length);
        setFilteredAddressBook({ groups: filtered });
    };

    const toggleAddress = (event, group, email) => {
        if (event.target.checked) {
            setSelectedAddresses([...selectedAddresses, {group, email}]);
        } else {
            setSelectedAddresses(selectedAddresses.filter(x => x.group !== group || (x.group === group && x.email !== email)));
        }
    };

    const UseAddresses = (event) => {
        event.preventDefault();
        onSubmit([... new Set(selectedAddresses.map(x => x.email))]);
        close(event);
    };

    useEffect(() => {
        setFilteredAddressBook(addressbook);
    }, [addressbook]);

    useEffect(() => {
        if (!filteredAddressBook || !filteredAddressBook.groups) {
            return;
        }
        setSelectedAddresses( selectedAddresses.filter( x => filteredAddressBook.groups.map(g => g.addresses.map(a => ({group: g.name, email: a.email}))).find(g => g.find(a => a.group === x.group && a.email === x.email) )) )
    }, [filteredAddressBook]);

    return (
        <div className="address-lookup">
            <div className="row popup-header">
                <div className="col-11"><h1>Address Book</h1></div>
                <div className="col-1">
                    <a href="#" onClick={close} title="Close Address Lookup"><i className="fas fa-times"></i></a>
                </div>
            </div>
            <div className="row content">
                <div className="col-12 form-group">
                    <input type="text" name="search" id="addressSearch" className="form-field" placeholder="Search" onChange={Search} /><label className="form-label" htmlFor="addressSearch">Search</label>
                </div>
            </div>
            <div className="address-list">
                {filteredAddressBook && filteredAddressBook.groups && filteredAddressBook.groups.map((group, index) => 
                <div className="row content" key={"group-" + index}>
                    <div className="col-12">
                        <div className="address-group">
                            <div><h3>{group.name}</h3></div>
                            <div className="row">
                                <div className="col-1">&nbsp;</div>
                                <div className="col-4"><strong>Name</strong></div>
                                <div className="col-7"><strong>E-Mail</strong></div>
                            </div>
                            {group.addresses && group.addresses.map((contact, i) => 
                                <div className="row" key={"group-" + index + "-contact-" + i}>
                                    <div className="col-1"><input type="checkbox" value={contact.email} onChange={(event) => toggleAddress(event, group.name, contact.email)} /></div>
                                    <div className="col-4">{contact.name}</div>
                                    <div className="col-7">{contact.email}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div className="row content">
                <div className="col-12">
                    <button className="base-btn submit-btn" onClick={UseAddresses}>Use Selected Addresses</button>
                </div>
            </div>
        </div>
    );
};
