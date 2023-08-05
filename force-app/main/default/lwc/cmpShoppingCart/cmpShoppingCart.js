import { LightningElement, wire, track } from 'lwc';
import { publish, MessageContext, subscribe } from 'lightning/messageService';
import MY_MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';

let prodId = '';

export default class myShoppingCart extends LightningElement {
  @wire(MessageContext)
  messageContext;

  connectedCallback()
  {
    this.subscribeToMessageChannel();
  }
  
  subscribeToMessageChannel(){
    if(this.subscription){
        return;
    }
    this.subscription =  subscribe(
        this.messageContext,
        MY_MESSAGE_CHANNEL,
        (message) => {
            this.handleMessage(message);
        }
    );
  } 

  @track prodRow=[];

  handleMessage(message){
    
    prodId += '<br//>' + message.data;
    let idx = this.prodRow.indexOf(message.data);
    if(idx < 0)
        this.prodRow.push(message.data);
    else
        alert('O producto já existe no carrinho');
    //console.log('Mensaje recibido', prodId);
  }

  /*handleIncrement() {
    // this.counter++;
    const payload = { 
      operator: 'add',
      constant: 1
    };
    publish(this.messageContext, COUNT_UPDATED_CHANNEL, payload);
  }
  
  handleDecrement() {
    // this.counter--;
    const payload = { 
      operator: 'subtract',
      constant: 1
    };
    publish(this.messageContext, COUNT_UPDATED_CHANNEL, payload);
  }
  handleMultiply(event) {
    const factor = event.detail;
     // this.counter *= factor;
    const payload = { 
      operator: 'multiply',
      constant: factor
    };
    publish(this.messageContext, COUNT_UPDATED_CHANNEL, payload);
  }*/
}