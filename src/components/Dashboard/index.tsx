import { createSignal, For, Switch, Match } from 'solid-js'
import type { Component } from 'solid-js'
import CustomSlideAnimation from '@components/CustomSlideAnimation'
import DeviceComponent from '@components/Device'
import CreateDevice from '@components/Device/CreateDevice'
import CustomPopover from '@components/Header/CustomPopover'
import CreateListDevice from '@components/List/CreateListDevice'
import List from '@components/List/List'
import ListHeader from '@components/List/ListHeader'
import { Flex } from '@components/ui/flex'
import { Icons } from '@components/ui/icon'
import { Label } from '@components/ui/label'
import { POPOVER_ID } from '@static/enums'
import { Device } from '@static/types'
import './index.css'

/**
 * Dashboard component:
 *
 * Will iterate over discovered devices and display them in cards
 * Clicking on a card will take the user to the device's page
 * Each card will have basic information about the device, and buttons for turning off and on the device
 * The cards can be displayed in grid view or list view
 * The cards will have an indicator for the device's status
 * The a button for adding a new device will be accessible from the dashboard
 */

interface DashboardProps {
    onClickNavigateDevice: (device: Device) => void
    onClickNavigateCreateDevice: () => void
    devices: Device[]
    firmwareVersion: string
}

const Dashboard: Component<DashboardProps> = (props) => {
    const [displayMode, setDisplayMode] = createSignal(POPOVER_ID.GRIP)
    return (
        <div
            class="flex-grow w-full"
            style={{
                transition: 'width 0.3s ease-in-out',
            }}>
            <div class="py-4 px-2">
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="between"
                    class="w-full mt-4 gap-4">
                    <Flex class="items-center">
                        <Label size="3xl" weight="bold" class="tracking-[0.02em] text-white">
                            DEVICES
                        </Label>
                    </Flex>
                    <div class="mx-auto">
                        <CustomSlideAnimation
                            firstChild={
                                <div
                                    class="flex p-2"
                                    onPointerDown={() => setDisplayMode(POPOVER_ID.GRIP)}>
                                    <CustomPopover
                                        styles="h-full"
                                        popoverContent={POPOVER_ID.GRIP}
                                        icon={<Icons.grip color="#ffffff" size={20} />}
                                        disablePopover={true}
                                    />
                                </div>
                            }
                            secondChild={
                                <div
                                    class="flex p-2"
                                    onPointerDown={() => setDisplayMode(POPOVER_ID.LIST)}>
                                    <CustomPopover
                                        styles="h-full"
                                        popoverContent={POPOVER_ID.GRIP}
                                        icon={<Icons.list color="#ffffff" size={20} />}
                                        disablePopover={true}
                                    />
                                </div>
                            }
                        />
                    </div>
                </Flex>
                <Switch>
                    <Match when={displayMode() === POPOVER_ID.GRIP}>
                        <div class="device_grid">
                            <For each={props.devices}>
                                {(device) => (
                                    <DeviceComponent
                                        firmwareVersion={props.firmwareVersion}
                                        {...device}
                                        onPointerDown={() => props.onClickNavigateDevice(device)}
                                    />
                                )}
                            </For>
                            <CreateDevice
                                onPointerDown={() => props.onClickNavigateCreateDevice()}
                            />
                        </div>
                    </Match>
                    <Match when={displayMode() === POPOVER_ID.LIST}>
                        <ListHeader />
                        <For each={props.devices}>
                            {(device) => (
                                <List
                                    {...device}
                                    onPointerDown={() => props.onClickNavigateDevice(device)}
                                />
                            )}
                        </For>
                        <CreateListDevice
                            onPointerDown={() => props.onClickNavigateCreateDevice()}
                        />
                    </Match>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard