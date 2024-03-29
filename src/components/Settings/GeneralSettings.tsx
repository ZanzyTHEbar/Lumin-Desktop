import { FormHandler } from 'solid-form-handler'
import { For, Switch, Match, type Component } from 'solid-js'
import {
    DeviceSettingContainer,
    DeviceSettingItemWrapper,
    DeviceSettingsContentProps,
} from './DeviceSettingUtil'
import { Input } from '@components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@components/ui/select'
import { Switch as ToggleSwitch } from '@components/ui/switch'
import { dataLabels, generalSettings, selectionSignals } from '@src/static'
import { DEVICE_TYPE } from '@src/static/enums'

interface GeneralSettingsProps extends DeviceSettingsContentProps {
    handleSelectionChange: (dataLabel: string, value: string) => void
    handleInputChange: (
        e: Event & {
            currentTarget: HTMLInputElement
            target: HTMLInputElement
        },
    ) => void
    handleToggleChange: (isChecked: boolean) => void
    formHandler?: FormHandler | undefined
    handleValueChange: (dataLabel: string) => string
}

const GeneralSettings: Component<GeneralSettingsProps> = (props) => {
    /* TODO: limit serial number to 15 character - must be alphanumeric 
    - the LAnCODE is always 7 alphanumeric */

    return (
        <DeviceSettingContainer label="General Setup" layout="col">
            {/* Set Name */}
            {/* Set Bound Printer - from MDNS dropdown list*/}
            {/* Set Printer Serial number */}
            {/* Set Printer LAN Code */}
            <For each={generalSettings}>
                {(deviceSetting) => (
                    <DeviceSettingItemWrapper
                        label={deviceSetting.label}
                        popoverDescription={deviceSetting.popoverDescription}>
                        <Switch>
                            <Match when={deviceSetting.type === 'input'}>
                                <Input
                                    class="border border-accent"
                                    autocomplete="off"
                                    data-label={deviceSetting.dataLabel}
                                    name={deviceSetting.dataLabel}
                                    placeholder={deviceSetting.placeholder}
                                    id={deviceSetting.dataLabel}
                                    minLength={deviceSetting.minLen}
                                    maxLength={deviceSetting.maxLen}
                                    required={deviceSetting.required}
                                    type={deviceSetting.inputType}
                                    value={props.handleValueChange(deviceSetting.dataLabel)}
                                    onChange={props.handleInputChange}
                                    formHandler={props.formHandler}
                                />
                            </Match>
                            <Match when={deviceSetting.type === 'select'}>
                                <Select
                                    value={selectionSignals[dataLabels.deviceType]?.value()}
                                    onChange={(value) =>
                                        props.handleSelectionChange(dataLabels.deviceType, value)
                                    }
                                    defaultValue={DEVICE_TYPE.WIRED}
                                    options={deviceSetting.options!}
                                    placeholder={deviceSetting.placeholder}
                                    itemComponent={(props) => (
                                        <SelectItem class="" item={props.item}>
                                            {props.item.rawValue}
                                        </SelectItem>
                                    )}>
                                    <SelectTrigger
                                        aria-label={deviceSetting.ariaLabel}
                                        class="w-[150px]">
                                        <SelectValue<string>>
                                            {(state) => state.selectedOption()}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent class="bg-base-300/75 hover:bg-base-200 overflow-y-scroll h-[70px]" />
                                </Select>
                            </Match>
                            <Match when={deviceSetting.type === 'checkbox'}>
                                <ToggleSwitch
                                    id="firmware-flashing-toggle"
                                    aria-label={deviceSetting.ariaLabel}
                                    label={deviceSetting.label}
                                    onChange={props.handleToggleChange}
                                />
                            </Match>
                        </Switch>
                    </DeviceSettingItemWrapper>
                )}
            </For>
        </DeviceSettingContainer>
    )
}

export default GeneralSettings
