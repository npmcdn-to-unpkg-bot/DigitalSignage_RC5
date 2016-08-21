/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { RouterConfig } from '@angular/router';

import {VOViewport, VOLayout, VOLayoutProps, UpdateResult, VOTemplate, VODevice} from "../services/models";
//import {LayoutAssemplerView} from "./layoutassembler-view";
//import { PlaylistsService } from "../services/playlists-service";
import { DragPlayListService } from "./drag-playlist-service";

//import { LayoutViewportPlaylists } from "../layouts/layout-viewport-playlists";




import {LayoutsTemlatesService} from "../services/layouts-templates-service";
import {AssemblerPlayLists} from "./playlists-list-dragable";
import {LayoutEditorViewport} from "./layout-editor-viewport";
import {LayoutEditorService} from "./layout-editor-service";
import {DeviceEditorService} from "../device/device-editor-service";

declare var  domtoimage:any;
@Component({
    selector: 'layout-editor',
    template: `
<div>
            <div class ="panel-heading">
                <h3>Layout assembler</h3>
                <nav>                 
                    <a [routerLink]="['/layout-template/',-1]" class="btn btn-default"><span class="fa fa-plus"></span> Create New Layout</a>                           
                    <a #mybtn class="btn btn-default" [class.disabled]="toolsDisadled" (click)="onDeleteClick($evtnt,mybtn)"><span class="fa fa-minus"></span> Delete Layout</a>
                    <a class="btn btn-default" (click) = "onServerSaveClick()"><span class="fa fa-life-saver"></span> Save on Server</a>
                </nav>
            </div>
            <div class="panel-body">                 
                <div>
                    <playlists-list-dragable></playlists-list-dragable>                
                </div>
                <hr size="3">
                <div class="layout">
                    <div class="form-group">
                        <label>Layout Name</label>
                       <input type="text" [(ngModel)]="currentLayout.props.label" name="layoutname" />
                        <label *ngIf="devicesLabels">Used devices: <span>{{devicesLabels}}</span> </label>
                    </div>
                    <div  id="SnapshotDiv" [style.width.px]="mySizeW" [style.height.px]="mySizeH">
                        <div id="PictureDiv" [style.width.px]="mySizeW" [style.height.px]="mySizeH"> 
                            <div id="ViewPortsDiv">
                                <div  *ngFor="let myitem of currentViewPorts">                           
                                    <layout-editor-viewport [item]="myitem"  (onview)="onClickViewport()"></layout-editor-viewport>                                  
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div id="SnapResult">
                   
                   
                    </div>
                </div>
               
            </div>
</div>                  
             `
    ,styles: [`

            .layout{
                text-align: center;
            }
            #SnapshotDiv{
                position: relative;
                margin: auto;
                box-shadow: grey 5px 5px 10px;
              /*  width: 824px;
                height: 400px;*/
            }
            #PictureDiv{
                position: absolute;
                top:0;
                left: 0;
            }
           #ViewPortsDiv{
                position: absolute;
                top:0;
                left: 0;
                transform: scale(0.5);            
            }
            
            `]
    ,
    directives: [ROUTER_DIRECTIVES,AssemblerPlayLists,LayoutEditorViewport],
    providers: [LayoutEditorService,DeviceEditorService,LayoutsTemlatesService,DragPlayListService]
})

export class LayoutEditor implements OnInit {
    currentLayout: VOLayout = new VOLayout({});
    currentViewPorts:VOViewport[];
    devicesLabels:string;

    template:VOTemplate;
    errorMessage: string;

    toolsDisadled:boolean;

    mySizeW: number = 960;
    mySizeH: number = 540;

    private sub: any;

    constructor (
        private editorService:LayoutEditorService
        , private deviceEditorService: DeviceEditorService
        , private route:ActivatedRoute
        , private templatesService:LayoutsTemlatesService
        , private router:Router
    ) { }

    ngOnInit() {

        this.editorService.currentItem$.subscribe((item:VOLayout)=>this.setCurrent(item));

        this.sub = this.route.params.subscribe(params => {

            var id:number = +params['id'];
            if(params['type']=='template'){
                this.toolsDisadled = true;
                this.templatesService.getTemplateById(id).subscribe((res:VOTemplate)=>{
                    console.log(res);
                    var layout = new VOLayout({viewports:res.viewports});
                    layout.props.width = res.width;
                    layout.props.height = res.height;
                    this.mySizeW = res.width/2;
                    this.mySizeH = res.height/2;
                    layout.props.id = -1;
                    this.currentViewPorts = layout.viewports;
                    this.currentLayout = layout;
                })
            }else{
                this.editorService.getLayoutById(id);

            }

        });
     /*   this.layoutService.selectedItem$.subscribe(
            data => this.currentLayout = data,
            error => this.errorMessage = <any>error
        );*/

       /* this.viewportService.getViewports();
        let params = this.utils.getUrlParams();
        if (params) {this.viewplaylists = false} else {this.viewplaylists = true};*/
    }

    setCurrent(item:VOLayout):void{
        this.currentLayout = item;
        this.mySizeW = item.props.width/2;
        this.mySizeH = item.props.height/2;
        console.log(item);
        this.deviceEditorService.getUsedDevice(item.props)
            .subscribe((devices:VODevice[]) => {
                item.usedDevice = devices;
                if(item.usedDevice && item.usedDevice.length){
                    var labelArr:string[] = item.usedDevice.map(function (item) {
                        return item.label;
                    });
                    this.devicesLabels = labelArr.join(', ');
                } else {
                    this.devicesLabels = 'no devices';
                }
                console.log('res ', this.currentLayout.usedDevice);
                console.log('devicesLabels ', this.devicesLabels);
            });
        this.currentViewPorts = item.viewports;
    }
    onSaveClick ():void {
       // this.viewportService.saveData(this.viewports);
    }

    makeSnap(callBack:Function):void{
        var node = document.getElementById('PictureDiv');

      /*  console.log(node);
        domtoimage.toPng(node)
            .then(function (dataUrl) {

              var img = new Image();
               img.src = dataUrl;
               document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
*/
       domtoimage.toJpeg(node,{ quality: 0.60 ,bgcolor:'#ffffff'})
            .then(function (dataUrl) {
              callBack(dataUrl);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

    }

    onDeleteClick():void{
        if(this.currentLayout && confirm('You want to delete assemble '+this.currentLayout.props.label+'?\n' +
                'Used devices: ' + this.devicesLabels))
            this.editorService.deleteLayoutById(this.currentLayout.props.id).subscribe(
                (res:UpdateResult)=>{ this.router.navigate(['../layout-template/',-1])}
            )
    }
    onViewPlaylists():void {
        //this.viewplaylists = !this.viewplaylists;
    }
    onServerSaveClick():void{
        ///console.log(this.currentViewPorts);

      this.makeSnap((dataUrl)=>{
          this.currentLayout.props.image = dataUrl;
          this.currentLayout.props.type='lite';
          this.currentLayout.viewports = this.currentViewPorts;
           this.editorService.saveOnServer(this.currentLayout);
        })

       // this.layoutService
        //this.asseblerService.setlayout(this.currentLayout);
      //console.log(this.layoutService.selectedItem)
       // console.log(this.currentLayout);

    }
 }





