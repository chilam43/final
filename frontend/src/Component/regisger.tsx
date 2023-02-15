import { Grid, Modal, Alert, Group, Button, Input, TextInput } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useState } from "react";

import { IconX, IconCheck } from '@tabler/icons';
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';


//////password ////
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
/////////////////////////////////////////////////////


export function Register() {
    ////////////password ///////
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState('');


    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
    ////////////password ///////


    const [info, setInfo] = useState({
        name: "",
        confirmpassword: "",
        email: "",
    })





    const [opened, setOpened] = useState(false);



    return (
        <>
            <div>

                <Modal
                    centered
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Registration"
                >

                    <form onSubmit={async (event) => {
                        event.preventDefault()
                        await fetch('http://localhost:8080/register', {
                            method: "Post",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: info.name,
                                email: info.email,
                                password: value
                            })
                        })
                        setInfo({
                            name: "",
                            confirmpassword: "",
                            email: "",
                        })
                        setValue("")
                        setOpened(false);

                    }}>
                        <div style={{ display: "flex-block", justifyContent: "center", alignItems: "center" }}>
                            <div>
                                <div>Username :</div>
                                <TextInput required id="name" name="name" type="text" placeholder='username' value={info.name} onChange={e => { setInfo({ ...info, name: e.currentTarget.value }) }}></TextInput>
                                <div>Password :</div>
                                {/*  password */}
                                <div >
                                    <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
                                        <Popover.Target>
                                            <div
                                                onFocusCapture={() => setPopoverOpened(true)}
                                                onBlurCapture={() => setPopoverOpened(false)}
                                            >
                                                <PasswordInput
                                                    withAsterisk

                                                    placeholder="Your password"
                                                    value={value}
                                                    onChange={(event) => setValue(event.currentTarget.value)}
                                                />
                                            </div>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                            <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
                                            <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
                                            {checks}
                                        </Popover.Dropdown>
                                    </Popover>
                                </div>

                                {/* password */}
                                <div> Confirm Password :</div>
                                {/* confirm password */}
                                <PasswordInput
                                    withAsterisk

                                    placeholder="Your password"
                                    value={info.confirmpassword}
                                    onChange={(e) => setInfo({ ...info, confirmpassword: e.currentTarget.value })}
                                />

                                {/* confirm password */}
                                <div>email :</div>
                                <TextInput required id="email" name="email " type="email" placeholder='email' value={info.email} onChange={e => { setInfo({ ...info, email: e.currentTarget.value }) }}></TextInput>
                            </div>
                            <p aria-hidden ></p>
                            <div >
                                {value === info.confirmpassword ? <Button type="submit">Submit</Button> : <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
                                    Something terrible happened! password does not match!
                                </Alert>}
                            </div>
                        </div>
                    </form>
                </Modal>

                <Group position="center">
                    <Button onClick={() => setOpened(true)}>Register</Button>
                </Group>

            </div>

        </>
    )
}