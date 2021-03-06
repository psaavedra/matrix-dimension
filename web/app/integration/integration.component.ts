import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Integration } from "../shared/models/integration";
import { overlayConfigFactory } from "ngx-modialog";
import { Modal, BSModalContext } from "ngx-modialog/plugins/bootstrap";
import { IntegrationService } from "../shared/integration.service";

export class ConfigModalContext extends BSModalContext {
    public integration: Integration;
    public roomId: string;
    public scalarToken: string;
}

@Component({
    selector: "my-integration",
    templateUrl: "./integration.component.html",
    styleUrls: ["./integration.component.scss"],
})
export class IntegrationComponent {

    @Input() integration: Integration;
    @Input() roomId: string;
    @Input() scalarToken: string;
    @Output() updated: EventEmitter<any> = new EventEmitter();

    constructor(/*overlay: Overlay, vcRef: ViewContainerRef, */public modal: Modal) {
        // overlay.defaultViewContainer = vcRef;
    }

    public update(): void {
        this.integration.isEnabled = !this.integration.isEnabled;
        this.updated.emit();
    }

    public configureIntegration(): void {
        this.modal.open(IntegrationService.getConfigComponent(this.integration), overlayConfigFactory({
            integration: this.integration,
            roomId: this.roomId,
            scalarToken: this.scalarToken,
            isBlocking: false,
            size: "lg"
        }, BSModalContext));
    }
}
