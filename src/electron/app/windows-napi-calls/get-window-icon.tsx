import { addon } from ".";

function base64Decode(str: string): Buffer {
    return Buffer.from(str, 'base64');
}

/*
export function getWindowIcon(hwnd: number, iconFormat: string): Promise<string> {
    const paramsObj = { hwnd: hwnd, iconFormat: iconFormat }; // Other supported formats are 'png' and 'bmp'.
    const paramsStr = JSON.stringify(paramsObj);

    return new Promise<string>((resolve: (arg0: string) => void, reject: (arg0: string) => void) => {
        addon.getWindowIcon(paramsStr, (err: any, data: string) => {
            if (err) {
                //console.error(err);
                reject(err);
            }
            else {
                //console.log(data);
                resolve(data);
            }
        });
    });
}
*/

///
/// Class for getting window icon. Instantiate once and call getIcon multiple times.
///
/// During instantiation it internally starts GDI Plus. So, do not create/destruct this class multiple times, 
/// it will be expensive.
///
/// Usage:
/// let getter = new WindowIconGetter();
/// let [iconBinaryBmp, iconTypeBmp] = await getter.getIcon(0x1114C, 'png');
///
type iconFormat_t = 'png' | 'jpeg' | 'bmp';

class WindowIconGetter {
  constructor() {
    this.iconGetter = new addon.WindowIconGetter();
    this.constructed = true;
  }

  destruct() {
    delete this.iconGetter;
    this.constructed = false;
  }

  /// Demonstrates how to use Promise to get Window icon from pmat_plugin_nodejs.node
  async getIcon(hwnd: number, iconFormat: iconFormat_t) : Promise<[Buffer, iconFormat_t]> {
    if (!this.constructed)
      throw new Error('Attempting call on destructed object');

    const paramsObj = { hwnd: hwnd, iconFormat: iconFormat };
    const paramsStr = JSON.stringify(paramsObj);
  
    return new Promise<[Buffer, iconFormat_t]>((resolve: (arg0:[Buffer, iconFormat_t])=>void, reject: (arg0:string)=>void) => {
      this.iconGetter.getWindowIcon(paramsStr, (err: any, data: string) => {
        if (err) {
          //console.error(err);
          reject(err);
        }
        else {
          //console.log(data);
          let iconContentObj = JSON.parse(data);
          let iconBinary = base64Decode(iconContentObj.data);
          resolve([iconBinary, iconContentObj.type]);
        }
      });
    });
  }

  private iconGetter: any;
  private constructed: boolean;
}

/*
async function doWork() {
  try {
    //let hwnd = await getTargetWindow();
    //console.log('HWND:', hwnd);

    //let getter = new WindowIconGetter();
    //let [iconBinaryBmp, iconTypeBmp] = await getter.getIcon(0x1114C, 'png');
    //fs.writeFileSync('ImportedIcon.' + iconTypeBmp, iconBinaryBmp);
    //getter.destruct();

    //collectWindowControlsTest(0x1114C);

    createWindowManifestTest(0x1114C);       // Will create JSON manifest
    //createWindowManifestTest(0x1114C, true); // Will create XML manifest
  }
  catch (err) {
    console.log(err);
  }
}
*/
