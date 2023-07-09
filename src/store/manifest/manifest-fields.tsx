import { EngineControl } from '@/electron/app/napi-calls';
import { Mani } from '@/store/manifest';
import { SymbolFieldBtn, SymbolFieldTxt, SymbolFieldChk, SymbolFieldLst, SymbolFieldPsw, SymbolFieldEdt } from '@ui/icons';

export const fieldIcons = {
    edit: SymbolFieldEdt,
    psw: SymbolFieldPsw,
    check: SymbolFieldChk,
    list: SymbolFieldLst,
    combo: SymbolFieldLst,
    text: SymbolFieldTxt,
    button: SymbolFieldBtn,
};

export type FieldIconTypes = Pick<Mani.Field, 'type' | 'password' | 'choosevalue'>;

export function FormRowTypeIcon({ field, className }: { field: FieldIconTypes; className?: string; }) {
    const type = field.password ? "psw" : field.type as keyof typeof fieldIcons;
    const Icon =
        fieldIcons[type]?.({
            className,
            title: type !== "list"
                ? `Field type: ${type}`
                : `Field choices: ${field.choosevalue}`,
        })
        || <div className="text-red-500">nan</div>;
    return Icon;
}

export function engineControlToFieldIconTypes(item: EngineControl): FieldIconTypes {
    const isPsw = item.type === 'psw';
    return {
        type: (isPsw ? 'edit' : item.type) as Mani.FieldTypeStr,
        password: isPsw,
        ...(item.choosevalues.length && { choosevalue: item.choosevalues.join(',') }),
    };
}
