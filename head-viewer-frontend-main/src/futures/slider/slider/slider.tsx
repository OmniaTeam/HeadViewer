import { Slider, Input } from "@nextui-org/react";
import { useState } from "react";

interface CustomSliderProps {
    minValue: number;
    maxValue: number;
    step: number;
    defaultValues: number[];
    labels: string[];
    onChange: (values: number[]) => void;
}

export const CustomSlider = (props: CustomSliderProps) => {
    const [value, setValue] = useState<number[]>(props.defaultValues);

    const handleInputChange = (index: number, newValue: number) => {
        const updatedValue = [...value];
        updatedValue[index] = newValue;
        setValue(updatedValue)
        props.onChange(updatedValue);
    };

    const handleSliderChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
            setValue(values);
            props.onChange(values);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1">
                <Input
                    size="sm"
                    radius="sm"
                    label={props.labels[0]}
                    type="number"
                    value={String(value[0])}
                    onChange={(e) => handleInputChange(0, Number(e.target.value))}
                />
                <Input
                    size="sm"
                    radius="sm"
                    label={props.labels[1]}
                    type="number"
                    value={String(value[1])}
                    onChange={(e) => handleInputChange(1, Number(e.target.value))}
                />
            </div>
            <Slider
                size="sm"
                aria-label="Выберите диапазон значений"
                minValue={props.minValue}
                maxValue={props.maxValue}
                step={props.step}
                defaultValue={value}
                onChange={handleSliderChange}
            />
        </div>
    );
};