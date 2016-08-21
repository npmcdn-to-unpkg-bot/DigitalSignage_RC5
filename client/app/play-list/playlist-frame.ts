/**
 * Created by Vlad on 7/24/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {VOPlayLists_Assets, VOAsset} from "../services/models";

@Component({
    selector:'playlist-frame',
    template:`
<div>
            <div class="thumb-128-2">
                    <div>
                        <img src="{{image}}">
                        <div>{{label}}</div>
                    </div>
            </div>
</div>   


                <!--<div class="frame">-->
                    <!--<img src=" {{ image }} " width="128" height="128"> -->
                <!--</div>       -->
             `,
    styles: [`
               img {
                border: 1px solid #0000AA;
                border-radius: 5px;
               }
               
            `]
})
export class PlayListFrame implements OnInit{
    @Input() item:VOPlayLists_Assets;

    label:string;
    image:string;
    ngOnInit():void{
        // var asset:VOAsset = this.item.asset
        // this.image = this.item.thumb
        switch(this.item.type){
            case 'video':
                this.image = this.item.thumb.split(',')[0];
                break;
            case 'image':
                this.image = this.item.thumb;
                break;
            default:
                this.image = this.item.thumb;
                break;
        }

        this.label = this.item.label || 'no label';
    }
}

