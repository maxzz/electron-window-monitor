// https://tailwind-elements.com/docs/standard/forms/checkbox
export const tailwindElementsCheckboxClasses = "\
relative \
float-left \
-ml-[1.5rem] \
mr-[6px] \
mt-[0.15rem] \
h-[1.125rem] \
w-[1.125rem] \
appearance-none \
rounded-[0.25rem] border-[0.125rem] border-solid \
border-neutral-300 \
outline-none \
before:pointer-events-none \
before:absolute \
before:h-[0.875rem] \
before:w-[0.875rem] \
before:scale-0 \
before:rounded-full \
before:bg-transparent \
before:opacity-0 \
before:shadow-[0px_0px_0px_13px_transparent] \
before:content-[''] \
checked:border-primary \
checked:bg-primary \
checked:before:opacity-[0.16] \
checked:after:absolute \
checked:after:-mt-px \
checked:after:ml-[0.25rem] \
checked:after:block \
checked:after:h-[0.8125rem] \
checked:after:w-[0.375rem] \
checked:after:rotate-45 \
checked:after:border-[0.125rem] \
checked:after:border-l-0 \
checked:after:border-t-0 \
checked:after:border-solid \
checked:after:border-white \
checked:after:bg-transparent \
checked:after:content-[''] \
hover:cursor-pointer \
hover:before:opacity-[0.04] \
hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] \
focus:shadow-none focus:transition-[border-color_0.2s] \
focus:before:scale-100 \
focus:before:opacity-[0.12] \
focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] \
focus:before:transition-[box-shadow_0.2s,transform_0.2s] \
focus:after:absolute \
focus:after:z-[1] \
focus:after:block \
focus:after:h-[0.875rem] \
focus:after:w-[0.875rem] \
focus:after:rounded-[0.125rem] \
focus:after:content-[''] \
checked:focus:before:scale-100 \
checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] \
checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] \
checked:focus:after:-mt-px \
checked:focus:after:ml-[0.25rem] \
checked:focus:after:h-[0.8125rem] \
checked:focus:after:w-[0.375rem] \
checked:focus:after:rotate-45 \
checked:focus:after:rounded-none \
checked:focus:after:border-[0.125rem] \
checked:focus:after:border-l-0 \
checked:focus:after:border-t-0 \
checked:focus:after:border-solid \
checked:focus:after:border-white \
checked:focus:after:bg-transparent \
dark:border-neutral-600 \
dark:checked:border-primary \
dark:checked:bg-primary \
dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] \
dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]";

/*
<div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
<input
    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
    type="radio"
    name="flexRadioDefault1"
    id="radioDefault01" />
<label
    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
    htmlFor="radioDefault01">
    Default radio
</label>
</div>
<div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
<input
    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
    type="radio"
    name="flexRadioDefault"
    id="radioDefault02"
    checked onChange={() => { }}
/>
<label
    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
    htmlFor="radioDefault02">
    Default checked radio
</label>
</div>
*/

//https://github.com/tailwindlabs/tailwindcss-forms/issues/27 'Add coloured check marks #27'
/*
@layer components {
    [type="checkbox"]:checked {
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23262626' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }

    [type="radio"]:checked {
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23262626' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
    }

    [type="checkbox"],
    [type="radio"] {
        @apply focus:ring-0 focus:ring-offset-0;
    }

    [type="checkbox"],
    [type="checkbox"]:checked,
    [type="checkbox"]:checked:hover,
    [type="checkbox"]:checked:focus,
    [type="checkbox"]:indeterminate:hover,
    [type="radio"],
    [type="radio"]:checked,
    [type="radio"]:checked:hover,
    [type="radio"]:checked:focus {
        @apply border-gray-300;
    }
}
*/
