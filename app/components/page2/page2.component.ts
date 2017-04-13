import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as Camera from "camera";

@Component({
    selector: "page2",
    templateUrl: "./components/page2/page2.component.html",
})
export class Page2Component implements OnInit {

    public fullName: string;

    public constructor (private route: ActivatedRoute) {
        this.fullName = "";
    }

    public ngOnInit () {
        this.route.queryParams.subscribe((params) => {
            this.fullName = params["name"];
        });
    }

    public capture () {
        Camera.takePicture().then((picture) => {
            //do something with picture
        });
    }

}
