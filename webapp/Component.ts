import UIComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "ui5/self/contained/model/models";

/**
 * @namespace ui5.self.contained
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json"
    };

    public override init(): void {
        super.init();
        this.getRouter().initialize();
        this.setModel(createDeviceModel(), "device");
    }
}