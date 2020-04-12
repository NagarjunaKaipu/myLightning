import { LightningElement, wire, track } from 'lwc';
import getAllCovids from '@salesforce/apex/CovidStatusController.getAllCovids';

const columns = [
    {label: 'State', fieldName: 'State__c', type:'text'},
    {label: 'State Code', fieldName: 'State_Code__c', type:'text'},
    {label: 'Confirmed', fieldName: 'Confirmed__c', type:'number', cellAttributes: { alignment: 'left' }},
    {label: 'Active', fieldName: 'Active__c', type:'number', cellAttributes: { alignment: 'left' }},
    {label: 'Recovered', fieldName: 'Recovered__c', type:'number', cellAttributes: { alignment: 'left' }},
    {label: 'Deaths', fieldName: 'Deaths__c', type:'number', cellAttributes: { alignment: 'left' }},
    {label: 'Today New Cases', fieldName: 'Today_New_Cases__c', type:'number', cellAttributes: { alignment: 'left' }},
    {label: 'Today Recovered', fieldName: 'Today_Recovered__c', type:'number', cellAttributes: { alignment: 'left' }},
    {label: 'Today Deaths', fieldName: 'Today_Deaths__c', type:'number', cellAttributes: { alignment: 'left' }},
    {label: 'Last Updated Date ', fieldName: 'Last_Updated_Time__c', type:'date'}
    ];
export default class Covid19StateWise extends LightningElement {
        // reactive variable
        @track data;
        @track columns = columns;
    
        // retrieving the data using wire service
        @wire(getAllCovids)
        wiredCovids({ error, data }) {
            if (data) {
                this.data = data;
                this.error = undefined;
            } else if (error) {
                this.error = error;
                this.data = undefined;
            }
        }
    }
