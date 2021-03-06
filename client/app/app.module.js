"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Vlad on 8/21/2016.
 */
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var http_1 = require('@angular/http');
var content_manager_1 = require("./assets/content-manager");
var playlist_library_1 = require("./play-list/playlist-library");
var playlist_editor_1 = require("./playlist-editor/playlist-editor");
var playlist_editable_1 = require("./playlist-editor/playlist-editable");
var layouts_assembled_1 = require("./layouts/layouts-assembled");
var layout_editor_1 = require("./layout-editor/layout-editor");
var layouts_template_1 = require("./layouts/layouts-template");
var devices_manager_1 = require("./device/devices-manager");
var devices_list_1 = require("./device/devices-list");
var device_editor_1 = require("./device/device-editor");
var ng2_md_tooltip_1 = require("./shared/ng2-md-tooltip/ng2-md-tooltip");
var tooltip_text_1 = require("./shared/ng2-md-tooltip/tooltip-text");
//import { HeroesModule } from './heroes/heroes.module';
//import { LoginComponent } from './login.component';
//import { DialogService }  from './dialog.service';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                content_manager_1.ContentManager,
                playlist_library_1.PlayListLibrary,
                playlist_editor_1.PlayListEditor,
                playlist_editable_1.PlaylistEditable,
                layouts_assembled_1.LayoutsAssembled,
                layout_editor_1.LayoutEditor,
                layouts_template_1.LayoutsTemplate,
                devices_manager_1.DevicesManager,
                devices_list_1.DevicesList,
                device_editor_1.DeviceEditor,
                ng2_md_tooltip_1.Ng2MdTooltip,
                tooltip_text_1.TooltipText
            ],
            providers: [
                app_routing_1.appRoutingProviders,
            ],
            entryComponents: [tooltip_text_1.TooltipText],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map