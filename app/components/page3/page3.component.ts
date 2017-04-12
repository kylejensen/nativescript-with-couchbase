import { Component, OnInit } from "@angular/core";
import * as ApplicationSettings from "application-settings";
import { Location } from "@angular/common";
import { Couchbase } from "nativescript-couchbase";

@Component({
    selector: "page3",
    templateUrl: "./components/page3/page3.component.html",
})
export class Page3Component implements OnInit {

    public firstname: string;
    public lastname: string;
    private storage: any;
    private database: any;

    public constructor (private location: Location) {
        this.firstname = "";
        this.lastname = "";
        this.storage = [];
        this.database = new Couchbase("coursetemplate");
    }

    public ngOnInit () {
        // this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
    }

    public save () {
        if (this.firstname && this.lastname) {
            // this.storage.push({
            //     "firstname": this.firstname,
            //     "lastname": this.lastname
            // });
            // ApplicationSettings.setString("data", JSON.stringify(this.storage));
            this.database.createDocument({
                "firstname": this.firstname,
                "lastname": this.lastname
            });
            this.location.back();
        }
    }

}
