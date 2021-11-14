/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// PaperNet specifc classes
const Customer = require('./customer.js');
const CustomerList = require('./customerlist.js');

/**
 * A custom context provides easy access to list of all commercial papers
 */
class ContactContext extends Context {

    constructor() {
        super();

        this.customerList = new CustomerList(this);
    }
}

/**
 * Define commercial paper smart contract by extending Fabric Contract class
 *
 */
class KYCContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('com.org1.kyc.customer');
    }
       /**
     * Define a custom context for commercial paper
    */
    createContext() {
        return new ContactContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    /**
     * 
     * @param {Context} ctx 
     * @param {String} PathHash 
     * @param {String} CustomerId 
     * @param {String} createdBy 
     * @param {String} lastModifiedBy 
     * @param {String} docType 
     * @param (String) docExt
     */
  /*  async addDocHash(ctx, PathHash, CustomerId, createdBy, lastModifiedBy,docType,docExt) {
        console.info('============= START : Register Document ===========');
        let newDoc = Document.createInstance(PathHash, CustomerId, createdBy, lastModifiedBy,docType,docExt);
        console.log("document meta info .... ",newDoc);
        await ctx.documentList.addDocument(newDoc);
        console.info('============= END : document metadata added to blockchain  ===========');
        return newDoc;
    }*/
    
    /**
     * 
     * @param { Context } ctx 
     * @param { String } PathHash 
     */
   /* async getDocHashDetails(ctx,PathHash){

        let documentKey  = Document.makeKey([PathHash]);
        // Return value of user account from blockchain
        let documentDetailsBuffer = await ctx.documentList
        .getDocument(documentKey)
        .catch((err) => console.log(err));
        return documentDetailsBuffer;
    }*/
	 /**
     * 
     * @param {Context} ctx 
     * @param {String} clientId 
     * @param {String} customerInfo 
     */
    async createCustomer(ctx,clientId,customerInfo){
        let newCustomer = Customer.createInstance(clientId,customerInfo);
        console.log("New Customer -- before creating a new contact..",newCustomer);
        await ctx.customerList.addCustomer(newCustomer);
        return newCustomer;
    }

   /**
   *
   * @param {Context} ctx
   * @param {String} clientId
   */
    async getCustomer(ctx, clientId) {
        let clientIdKey = Customer.makeKey([clientId]);
        // Return value of user account from blockchain
        let clientBuffer = await ctx.customerList
            .getCustomer(clientIdKey)
            .catch((err) => console.log(err));
        return clientBuffer;
    }
    /** 
     * 
     * @param {Context} ctx 
     * @param {String} clientId 
     * @param {String} customerInfo 
     */
   /* async customerCDDScreening(ctx,clientId,customerInfo){
        let newCustomerCDDScreening = Customer.createInstance(clientId,customerInfo);
        console.log("New Customer -- before creating a new contact..",newCustomerCDDScreening);
        await ctx.customerList.addCustomer(newCustomerCDDScreening);
        return newCustomerCDDScreening;
    }*/
}

module.exports = KYCContract;