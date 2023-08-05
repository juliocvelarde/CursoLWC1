import { LightningElement ,api, wire, track} from 'lwc';
import getProductList from '@salesforce/apex/ProductsController.getProductList';
import { publish, MessageContext } from 'lightning/messageService';
import MY_MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';

export default class LightningDatatableLWCExample extends LightningElement {
    @wire(MessageContext)
    messageContext;

    @track columns = [
        {label: 'View', type: 'button-icon', initialWidth: 75, typeAttributes: {iconName: 'action:preview', title: 'Preview', variant: 'border-filled', alternativeText: 'View'}},
        {label: 'Nome do producto', fieldName: 'Name', type: 'Name', sortable: true},
        {label: 'Qtd. Estoque', fieldName: 'QuantidadeEmEstoque__c', type: 'number'},
        {label: 'Preço', fieldName: 'Preco__c', type: 'currency'},
        {label: 'Imagem', fieldName: 'Imagem__c', type: 'url'},
    ];


    @track error;
    @track prodList;
    @wire(getProductList)
   wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.prodList = data;
        } else if (error) {
            this.error = error;
        }
    } 
    
   
   // @track columns = columns;
    @track prodRow={};
    @track rowOffset = 0;
    @track modalContainer = false;
    //@wire(getDataFromContact) wireContact;
    handleRowAction(event){
        const dataRow = event.detail.row;
        //window.console.log('dataRow@@ ' + dataRow);
        this.prodRow=dataRow;
        //window.console.log('product## ' + dataRow);
        this.modalContainer=true;
    }  
            
    closeModalAction()
    {
        this.modalContainer=false;
    }

    addToCar()
    {
        window.console.log('ADD TO CAR!');
    }


    handleClick(){
        const message = {
            data: this.prodRow.Name
        };
        publish(this.messageContext, MY_MESSAGE_CHANNEL, message);
    }

    
    
    
}             
