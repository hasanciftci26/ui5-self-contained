import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "ui5/self/contained/Component";
import View from "sap/ui/core/mvc/View";
import UI5Element from "sap/ui/core/Element";
import Router from "sap/f/routing/Router";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageBox from "sap/m/MessageBox";
import Route from "sap/ui/core/routing/Route";

/**
 * @namespace ui5.self.contained.controller
 */
export default class BaseController extends Controller {

    /* ======================================================================================================================= */
    /* Global Methods                                                                                                          */
    /* ======================================================================================================================= */

    public getRouter() {
        return this.getOwnerComponent().getRouter() as Router;
    }

    public getRoute(route: string) {
        return this.getRouter().getRoute(route) as Route;
    }

    public override getOwnerComponent() {
        return super.getOwnerComponent() as UIComponent;
    }

    public getCurrentView() {
        return this.getView() as View;
    }

    public getById<T extends UI5Element = UI5Element>(id: string) {
        const element = this.getCurrentView().byId(id);

        if (!element) {
            throw new Error(`The UI5 Element with the following id was not found: ${id}`);
        }

        return element as T;
    }

    public getODataModel(name?: string) {
        const model = this.getOwnerComponent().getModel(name);

        if (model instanceof ODataModel === false) {
            throw new Error(`The sap.ui.model.odata.v2.ODataModel with the following name was not found: ${name}`);
        }

        return model;
    }

    public navTo(route: string, parameters?: Record<string, any>, replace?: boolean) {
        this.getRouter().navTo(route, parameters, replace);
    }

    public getText(key: string, args?: any[]) {
        const model = this.getOwnerComponent().getModel("i18n") as ResourceModel;
        const bundle = model.getResourceBundle() as ResourceBundle;
        return bundle.getText(key, args, false) as string;
    }

    public showError(message: string) {
        MessageBox.error(message, {
            contentWidth: "20%",
            styleClass: "customMessageBox"
        });
    }

    /* ======================================================================================================================= */
    /* Global Event Handlers                                                                                                   */
    /* ======================================================================================================================= */

    public onNavigation(route: string, parameters?: Record<string, any>) {
        this.navTo(route, parameters);
    }
}