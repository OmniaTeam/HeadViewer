import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Key, useState } from "react";

interface ComboboxProps {
    items: {
        key: number;
        label: string;
    }[];
    label: string;
    actionLabel: string;
    onChangeHandler: (value : string) => void
}

export const Combobox = (props: ComboboxProps) => {
    const [selectedKey, setSelectedKey] = useState<Key | null>(null);

    const onSelectionChange = (value: Key | null) => {
        setSelectedKey(value);
    };

    return (
        <Autocomplete
            defaultItems={props.items}
            variant="flat"
            size="sm"
            radius="sm"
            label={props.label}
            placeholder={props.actionLabel}
            labelPlacement="inside"
            className="max-w-xs"
            onSelectionChange={onSelectionChange}
            onInputChange={props.onChangeHandler}
        >
        {(item) => (
            <AutocompleteItem key={item.key} textValue={item.label}>
                <div className="flex flex-col">
                    <span className="text-small">{item.label}</span>
                </div>
            </AutocompleteItem>
        )}
        </Autocomplete>
    );
};