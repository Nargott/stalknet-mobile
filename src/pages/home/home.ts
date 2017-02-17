import {Component} from '@angular/core';

import {
  NavController,
  AlertController,
  ActionSheetController
} from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              af: AngularFire) {
    this.messages = af.database.list('/messages');
  }

  addMessage() {
    let prompt = this.alertCtrl.create({
      title: 'Message Title',
      message: "Enter a title for a new message",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.messages.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(messageId, messageTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Message',
          role: 'destructive',
          handler: () => {
            this.removeMessage(messageId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateMessage(messageId, messageTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeMessage(messageId: string){
    this.messages.remove(messageId);
  }

  updateMessage(messageId, messageTitle){
    let prompt = this.alertCtrl.create({
      title: 'Message Title',
      message: "Update the title for this message",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: messageTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.messages.update(messageId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
