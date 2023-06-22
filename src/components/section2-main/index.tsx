import { MainActionsPanel } from "./main-actions-panel";
import { SawHandlePanel } from "./panel-window-handle";
import { SawContentPanel } from "./panel-window-content";
import { MonitoringCounter } from "./panel-monitor";

export function Section2Main() {
    return (
        <div className="relative m-4 text-primary-900">
            <MainActionsPanel />
            <SawHandlePanel />
            <SawContentPanel />
            <MonitoringCounter />
        </div>
    );
}
