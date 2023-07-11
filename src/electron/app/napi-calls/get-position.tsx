import { mainToRenderer } from "@/shared/ipc-main";
import { DragAndDropParams, DragAndDropResult, POINT, TargetClientRect, addon } from ".";

//TODO: this should go to pmat-plugin-types.ts
export type GetPositionResut = {
    point: POINT;
    rect?: TargetClientRect;
}

export function getTargetPosition(hwnd: string): Promise<GetPositionResut> {
    return new Promise<GetPositionResut>(
        (resolve, reject) => {
            const params: DragAndDropParams = { hwnd };
            const param = JSON.stringify(params);

            addon.dragAndDrop(param, (err: string, data: string) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                try {
                    const res = JSON.parse(data) as DragAndDropResult;

                    if ('progress' in res) {
                        console.log('progress', res.point);

                        mainToRenderer({type: "position-progress", progress: res})
                        return;
                    }
    
                    resolve(res);
                } catch (error) {
                    console.error('error', error);
                    
                    reject('>>>Faieled to get posiotion.');
                }
            });
        }
    );
}
