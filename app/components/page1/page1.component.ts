import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Location } from "@angular/common";
import { Couchbase } from "nativescript-couchbase";
import * as Platform from "platform";
import * as Application from "application";
var jsSHA = require('jssha');

declare var android: any;
declare var java: any;
declare var NSBundle: any;

@Component({
    selector: "page1",
    templateUrl: "./components/page1/page1.component.html",
})
export class Page1Component implements OnInit {

    public people: Array<any>;
    private storage: any;
    private database: any;

    public constructor (private router: Router, private location: Location) {
        this.people = [];
        this.storage = [];
        this.database = new Couchbase("coursetemplate");
        this.database.createView("people", "1", (document, emitter) => {
            emitter.emit(document._id, document);
        });
    }

    public ngOnInit () {
        this.location.subscribe(() => {
            this.loadData();
        });
        this.loadData();
    }

    public loadData () {
        this.people = [];
        let rows = this.database.executeQuery("people"),
            len = rows.length;
        for (let i = 0; i < len; i++) {
            this.people.push(rows[i]);
        }
    }

    public hashName (value: string): string {
        let shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.update(value);
        return shaObj.getHash("HEX");
    }

    public addUserData () {
        this.router.navigate(["page3"]);
    }

    public goToNextPage (fullName: string) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "name": fullName
            }
        };
        this.router.navigate(["page2"], navigationExtras);
    }

    public getApplicationVersion ():string {
        if (Platform.isAndroid) {
            let PackageManager = android.content.pm.PackageManager;
            let pkg = Application.android.context.getPackageManager().getPackageInfo(Application.android.context.getPackageName(), PackageManager.GET_META_DATA);
            return java.lang.Tnteger.toString(pkg.versionCode);
        } else {
            let version = NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleShortVersionString");
            return version;
        }
    }

}
