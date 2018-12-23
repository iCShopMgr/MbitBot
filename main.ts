//% weight=0 color=#b5b100 icon="\uf299" block="MbitBot"
namespace mbitbot {
    let K = 4096 / 20
	let StartBit = 0.5 * K
	let FullScaleBit = 1.94 * K

	function init() {
		pins.i2cWriteNumber(64, 16, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, 254 * 256 + 123, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, 0, NumberFormat.Int16BE, false)
	}

	init()
		
	function servo(Spin: number, Sangle: number) {
		let TS1 = (Sangle / 180 * FullScaleBit + StartBit) % 256
		let TS2 = (Sangle / 180 * FullScaleBit + StartBit) / 256
		let CH = (Spin - 1) * 4 + 8
		pins.i2cWriteNumber(64, CH * 256 + TS1, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, (CH + 1) * 256 + TS2, NumberFormat.Int16BE, false)
	}

	function motor(Spin: number, Speed: number) {
		let TM1 = Speed % 256
		let TM2 = Speed / 256
		let CH = (Spin - 1) * 4 + 8
		pins.i2cWriteNumber(64, CH * 256 + TM1, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, (CH + 1) * 256 + TM2, NumberFormat.Int16BE, false)
	}

	export enum MPin {
			//% block="M1+"
			Mpin1 = 13,
			//% block="M1-"
			Mpin2 = 14,
			//% block="M2+"
			Mpin3 = 15,
			//% block="M2-"
			Mpin4 = 16,
		//% block="M3+"
			Mpin5 = 11,
			//% block="M3-"
			Mpin6 = 12,
			//% block="M4+"
			Mpin7 = 9,
			//% block="M4-"
			Mpin8 = 10,
		}

	//%block="move Motor at|pin %MPin|value %number"
	export function move_motor_pin(mpin: MPin = 1, usevalue: number): void {
		if(usevalue>100)usevalue = 100
		if(usevalue<0)usevalue = 0
		usevalue = Math.map(usevalue, 0, 100, 0, 4095)
		motor(mpin, usevalue)	
	}

	export enum MPort {
			//% block="M1"
			MPT1 = 1,
			//% block="M2"
			MPT2 = 2,
			//% block="M3"
			MPT3 = 3,
			//% block="M4"
			MPT4 = 4,
		}

	//%block="move Motor at|port %MPort|value %number"
	export function move_motor_port(mpt: MPort = 1, usevalue: number): void {
		if(usevalue>100)usevalue = 100
		if(usevalue<-100)usevalue = -100
		
		switch(mpt) {
			case 1:
				if(usevalue>0) {
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(13, usevalue)
					motor(14, 0)
				}
				else {
					usevalue = usevalue*(-1)
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(13, 0)
					motor(14, usevalue)
				}
				break;
			case 2:
				if(usevalue>0) {
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(15, usevalue)
					motor(16, 0)
				}
				else {
					usevalue = usevalue*(-1)
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(15, 0)
					motor(16, usevalue)
				}
				break;
			case 3:
				if(usevalue>0) {
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(11, usevalue)
					motor(12, 0)
				}
				else {
					usevalue = usevalue*(-1)
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(11, 0)
					motor(12, usevalue)
				}
				break;
			case 4:
				if(usevalue>0) {
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(9, usevalue)
					motor(10, 0)
				}
				else {
					usevalue = usevalue*(-1)
					usevalue = Math.map(usevalue, 0, 100, 0, 4095)
					motor(9, 0)
					motor(10, usevalue)
				}
				break;		
		}
	}

	export enum SePin {
			//% block="S1"
			Sepin1 = 1,
			//% block="S2"
			Sepin2 = 2,
			//% block="S3"
			Sepin3 = 3,
			//% block="S4"
			Sepin4 = 4,
		//% block="S5"
			Sepin5 = 5,
			//% block="S6"
			Sepin6 = 6,
			//% block="S7"
			Sepin7 = 7,
			//% block="S8"
			Sepin8 = 8,
		}

	//%block="move Servo at|pin %SPin |to %number|degrees"
	export function move_servo_pin(sepin: SePin = 1, usevalue: number): void {
		if(usevalue>180)usevalue = 180
		if(usevalue<0)usevalue = 0
		servo(sepin, usevalue)	
	}
    /**
     * Light Sensor
    */
    //% blockId=Mbitbot_Light_Sensor block="Light Sensor"
    //% weight=10
    export function Light_Sensor(): number {
        led.enable(false)
        basic.pause(25)
        let Light_S = pins.analogReadPin(AnalogPin.P10)
        pins.digitalWritePin(DigitalPin.P10, 1);
        led.enable(true)
        return Light_S
    }
    
   

    export enum Jpin {
        //% block="J3 (P1,P2)"
        J3 = 3,
        //% block="J1 (P15,P16)"
        J1 = 1,
        //% block="J2 (P13,P14)"
        J2 = 2,
        //% block="J4 (P3,P4)"
        J4 = 4
    }

    /**
     * Me Line Follower Sensor
    */
    //% blockId=MbitBot_Me_Line_Follower_Sensor block="Me Line Follower Sensor|pin %jpin"
    //% weight=10
    export function Me_Line_Follower_Sensor(jpin: Jpin): number {
        let line_follow_Left_Pin = DigitalPin.P3
        let line_follow_Right_Pin = DigitalPin.P4
        switch (jpin) {
            case 1:
                line_follow_Left_Pin = DigitalPin.P13
                line_follow_Right_Pin = DigitalPin.P14
                break;
            case 2:
                line_follow_Left_Pin = DigitalPin.P15
                line_follow_Right_Pin = DigitalPin.P16
                break;
            case 3:
                line_follow_Left_Pin = DigitalPin.P1
                line_follow_Right_Pin = DigitalPin.P2
                break;
            case 4:
                line_follow_Left_Pin = DigitalPin.P3
                line_follow_Right_Pin = DigitalPin.P4
                break;
        }

        let i = 0

        if ((pins.digitalReadPin(line_follow_Left_Pin) == 0) && (pins.digitalReadPin(line_follow_Right_Pin) == 0)) {
            i = 0
        } else if ((pins.digitalReadPin(line_follow_Left_Pin) == 1) && (pins.digitalReadPin(line_follow_Right_Pin) == 0)) {
            i = 2
        } else if ((pins.digitalReadPin(line_follow_Left_Pin) == 0) && (pins.digitalReadPin(line_follow_Right_Pin) == 1)) {
            i = 1
        } else i = 3
        return i
    }

    /**
     * Me Ultrasonic Sensor
    */
    //% blockId=Mbitbot_Me_Ultrasonic_Sensor block="Me Ultrasonic Sensor|pin %jpin"
    //% weight=10
    export function Me_Ultrasonic_Sensor(jpin: Jpin): number {
        let pin = DigitalPin.P2
        switch (jpin) {
            case 1: pin = DigitalPin.P14
                break;
            case 2: pin = DigitalPin.P16
                break;
            case 3: pin = DigitalPin.P2
                break;
            case 4: pin = DigitalPin.P4
                break;
        }

        // send pulse
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin, 0);

        // read pulse
        let d = pins.pulseIn(pin, PulseValue.High, 23000);  // 8 / 340 = 
        return d * 5 / 3 / 58;
    }

    export enum Bpin {
        //% block="J3 (P1,P2)"
        bJ3 = 1,
        //% block="J4 (P3,P4)"
        bJ4 = 2
    }

    /**
     * Me Potentiometer
    */
    //% blockId=Mbitbot_Me_Potentiometer block="Me Potentiometer|pin %bpin"
    //% weight=10
    export function Me_Potentiometer(bpin: Bpin): number {
        let Ppin = pins.analogReadPin(AnalogPin.P2)
        switch (bpin) {
            case 1: Ppin = pins.analogReadPin(AnalogPin.P2)
                break;
            case 2: Ppin = pins.analogReadPin(AnalogPin.P4)
                break;
        }
        return Ppin
    }
    
    export enum LS_pin {
        //% block="J3 (P1,P2)"
        L_J3 = 1,
        //% block="J4 (P3,P4)"
        L_J4 = 2
    }

    /**
     * Me Sound Sensor
    */
    //% blockId=Mbitbot_Me_Sound_Sensor block="Me Sound Sensor|pin %bpin"
    //% weight=10
    export function Me_Sound_Sensor(bpin: Bpin): number {
        let Spin = pins.analogReadPin(AnalogPin.P2)
        switch (bpin) {
            case 1: Spin = pins.analogReadPin(AnalogPin.P2)
                break;
            case 2: Spin = pins.analogReadPin(AnalogPin.P4)
                break;
        }
        return Spin
    }

    export enum Tpin {
        //% block="J3 (P1,P2)"
        tJ3 = 1,
        //% block="J4 (P3,P4)"
        tJ4 = 2
    }
    
    export enum XYResult {
        //% block="X axis"
        Xaxis = 1,
        //% block="Y axis"
        Yaxis = 2     
    }
    
    /**
     * Me Joystick
    */
    //% blockId=Mbitbot_Me_Joystick block="Me Joystick|pin %tpin|get %xyResult"
    //% weight=10
    export function Me_Joystick(tpin: Tpin, xyResult: XYResult): number {
        let xpin = pins.analogReadPin(AnalogPin.P1)
        let ypin = pins.analogReadPin(AnalogPin.P2)
        switch (tpin) {
            case 1: 
                xpin = pins.analogReadPin(AnalogPin.P1)
                ypin = pins.analogReadPin(AnalogPin.P2)
                break;
            case 2:
                xpin = pins.analogReadPin(AnalogPin.P3)
                ypin = pins.analogReadPin(AnalogPin.P4)
                break;
        }
        if(xyResult==1) {
            return xpin
        }
        else {
            return ypin
        }
    }

    export enum Upin {
        //% block="I3 (P13,P14)"
        UI3 = 1,
        //% block="I4 (P15,P16)"
        UI4 = 2,
        //% block="I5 (P5,P11)"
        UI5 = 3,
        //% block="I6 (P9,P7)"
        UI6 = 4,
        //% block="I7 (P3,P4)"
        UI7 = 5,
        //% block="I8 (P1,P2)"
        UI8 = 6,
    }

    /**
     * CIRCUS Push Bottom
    */
    //% blockId=CIRCUS_Push_Bottom block="Push Bottom|pin %upin"
    //% weight=10
    export function Push_Bottom(upin: Upin): number {
        let PUpin = pins.digitalReadPin(DigitalPin.P13)
        switch (upin) {
            case 1: PUpin = pins.digitalReadPin(DigitalPin.P13)
                break;
            case 2: PUpin = pins.digitalReadPin(DigitalPin.P15)
                break;
            case 3: PUpin = pins.digitalReadPin(DigitalPin.P5)
                break;
            case 4: PUpin = pins.digitalReadPin(DigitalPin.P9)
                break;
            case 5: PUpin = pins.digitalReadPin(DigitalPin.P3)
                break;
            case 6: PUpin = pins.digitalReadPin(DigitalPin.P1)
                break;
        }
        return PUpin
    }

    export enum VRpin {
        //% block="I7 (P3,P4)"
        VRJ3 = 1,
        //% block="I8 (P1,P2)"
        VRJ4 = 2
    }

    /**
     * CIRCUS Analog VR
    */
    //% blockId=CIRCUS_Analog_VR block="Analog VR|pin %vrpin"
    //% weight=10
    export function Analog_VR(vrpin: VRpin): number {
        let vr_pin = pins.analogReadPin(AnalogPin.P1)
        switch (vrpin) {
            case 1: vr_pin = pins.analogReadPin(AnalogPin.P3)
                break;
            case 2: vr_pin = pins.analogReadPin(AnalogPin.P1)
                break;
        }
        return vr_pin
    }
    
    export enum REstep {
        //% block="ON"
        RE_ON = 1,
        //% block="OFF"
        RE_OFF = 2
    }
    /**
     * CIRCUS Relay
    */
    //% blockId=CIRCUS_Relay block="Relay|pin %index|set %turn"
    //% weight=10
    export function Relay(index: Upin, turn: REstep): void {
        let reStep = 0
        switch (turn) {
            case 1: reStep = 1
                break;
            case 2: reStep = 0
                break;
        }
        switch (index) {
            case 1: if(reStep==0) {
                        pins.digitalWritePin(DigitalPin.P13, 0)
                    }
                    else {
                        pins.digitalWritePin(DigitalPin.P13, 1)
                    }
                break;
            case 2: if(reStep==0) {
                        pins.digitalWritePin(DigitalPin.P15, 0)
                    }
                    else {
                        pins.digitalWritePin(DigitalPin.P15, 1)
                    }
                break;
            case 3: if(reStep==0) {
                        pins.digitalWritePin(DigitalPin.P5, 0)
                    }
                    else {
                        pins.digitalWritePin(DigitalPin.P5, 1)
                    }
                break;
            case 4: if(reStep==0) {
                        pins.digitalWritePin(DigitalPin.P9, 0)
                    }
                    else {
                        pins.digitalWritePin(DigitalPin.P9, 1)
                    }
                break;
            case 5: if(reStep==0) {
                        pins.digitalWritePin(DigitalPin.P3, 0)
                    }
                    else {
                        pins.digitalWritePin(DigitalPin.P3, 1)
                    }
                break;
            case 6: if(reStep==0) {
                        pins.digitalWritePin(DigitalPin.P1, 0)
                    }
                    else {
                        pins.digitalWritePin(DigitalPin.P1, 1)
                    }
                break;
        }   
    }

    /**
     * LCD 1602
    */
    export let LCD_I2C_ADDR = 0x20
    let BK = 0x08
    let RS = 0x00

    function setReg(dat: number): void {
        pins.i2cWriteNumber(LCD_I2C_ADDR, dat, NumberFormat.UInt8BE, false)
        basic.pause(1)
    }

    function send(dat: number): void {
        let d = dat & 0xF0
        d |= BK
        d |= RS
        setReg(d)
        setReg(d | 0x04)
        setReg(d)
    }

    function setcmd(cmd: number): void {
        RS = 0
        send(cmd)
        send(cmd << 4)
    }

    function setdat(dat: number): void {
        RS = 1
        send(dat)
        send(dat << 4)
    }

    export enum I2C_ADDR {
        //% block="0x20"
        addr1 = 0x20,
        //% block="0x27"
        addr2 = 0x27,
    }
    export enum on_off {
        //% block="on"
        on = 1,
        //% block="off"
        off = 0
    }

    function setI2CAddress(): void {
        setcmd(0x33)
        basic.pause(5)
        send(0x30)
        basic.pause(5)
        send(0x20)
        basic.pause(5)
        setcmd(0x28)
        setcmd(0x0C)
        setcmd(0x06)
        setcmd(0x01)
    } 

    //% blockId="LCD_setAddress" block="LCD1602 I2C address %myAddr"
    //% weight=8 blockExternalInputs=true
    export function setAddress(myAddr: I2C_ADDR): void {
        LCD_I2C_ADDR = myAddr
        setI2CAddress()
    }

    //% blockId="LCD_clear" block="LCD clear"
    //% weight=2
    export function clear(): void {
        setcmd(0x01)
    }

    //% blockId="LCD_backlight" block="set LCD backlight %on"
    //% weight=3
    export function set_backlight(on: on_off): void {
        if (on == 1)
            BK = 0x08
        else
            BK = 0x00
        setcmd(0x00)
    }

    function printChar(ch: number, x: number, y: number): void {
        if (x >= 0) {
            let a = 0x80
            if (y > 0)
                a = 0xC0
            a += x
            setcmd(a)
        }
        setdat(ch)
    }

    //% blockId="LCD_putString" block="LCD show string %s|on x:%x|y:%y"
    //% weight=6 x.min=0 x.max=15 y.min=0 y.max=1
    export function putString(s: string, x: number, y: number): void {
        if (s.length > 0) {
            let breakPoint = -1
            printChar(s.charCodeAt(0), x, y)
            if (y == 0)
                breakPoint = 16 - x
            for (let i = 1; i < s.length; i++) {
                if (i == breakPoint)
                    printChar(s.charCodeAt(i), 0, 1)
                else
                    printChar(s.charCodeAt(i), -1, 0)
            }
        }
    }
    //% blockId="LCD_putNumber" block="LCD show number %n|on x:%x|y:%y"
    //% weight=5 x.min=0 x.max=15 y.min=0 y.max=1
    export function putNumber(n: number, x: number, y: number): void {
        putString(n.toString(),x,y)
    }
}
