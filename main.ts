
//% weight=0 color=#CCB72C icon="\uf299" block="MbitBot"
namespace mbitbot {
    pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P3, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P4, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P7, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
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
    
    //%block="Servo |S1 %va1|S2 %va2|S3 %va3|S4 %va4|S5 %va5|S6 %va6|S7 %va7|S8 %va8"
    //% weight=10
    export function All_servo(va1: number, va2: number, va3: number, va4: number, va5: number, va6: number, va7: number,va8: number): void {
	if(va1>180)va1 = 180
	if(va1<0)va1 = 0
	if(va2>180)va2 = 180
	if(va2<0)va2 = 0
	if(va3>180)va3 = 180
	if(va3<0)va3 = 0
	if(va4>180)va4 = 180
	if(va4<0)va4 = 0
	if(va5>180)va5 = 180
	if(va5<0)va5 = 0
	if(va6>180)va6 = 180
	if(va6<0)va6 = 0
	if(va7>180)va7 = 180
	if(va7<0)va7 = 0
	if(va8>180)va8 = 180
	if(va8<0)va8 = 0
	servo(1, va1)
	servo(2, va2)
	servo(3, va3)
	servo(4, va4)
	servo(5, va5)
	servo(6, va6)
	servo(7, va7)
	servo(8, va8)
    }

/**
* ESP8266
*/
    export enum ESPpin {
        //% block="I3 (TX:P13,RX:P14)"
        Ep1 = 1,
        //% block="I4 (TX:P15,RX:P16)"
        Ep2 = 2,
        //% block="I8 (TX:P1,RX:P2)"
        Ep6 = 3,
    }
	
    //% blockId=Mbitbot_ESP8266 block="ESP8266|pin %epin|Wifi SSID %ssid|KEY %key"
    //% weight=10
    export function IC_ESP8266(epin: ESPpin = 1, ssid: string, key: string): void { 
	if(epin == 1) {
		serial.redirect(SerialPin.P13,SerialPin.P14,BaudRate.BaudRate115200)
	}
	else if(epin == 2) {
		serial.redirect(SerialPin.P15,SerialPin.P16,BaudRate.BaudRate115200)
	}
	else {
		serial.redirect(SerialPin.P1,SerialPin.P2,BaudRate.BaudRate115200)
	}
    	serial.writeString("AT+RST" + "\u000D" + "\u000A")
    	basic.pause(1000)
    	serial.writeString("AT+CWMODE_CUR=1" + "\u000D" + "\u000A")
    	basic.pause(1000)
    	let printT = "AT+CWJAP_CUR=\"" + ssid + "\",\"" + key + "\""
    	serial.writeString(printT + "\u000D" + "\u000A")
    	basic.pause(4000)
    }
    export enum CH {
        //% block="ON"
        CH1 = 1,
        //% block="OFF"
        CH2 = 2
    }
    //% blockId=ESP8266_SET block="ESP8266 Sleep Mode|pin %epin|set %ch"
    //% weight=10
    export function ESP8266_Sleep(epin: ESPpin = 1, ch: CH = 2): void { 
	if(epin == 1) {
		serial.redirect(SerialPin.P13,SerialPin.P14,BaudRate.BaudRate115200)
	}
	else if(epin == 2) {
		serial.redirect(SerialPin.P15,SerialPin.P16,BaudRate.BaudRate115200)
	}
	else {
		serial.redirect(SerialPin.P1,SerialPin.P2,BaudRate.BaudRate115200)
	}
	if(ch == 1) {
		serial.writeString("AT+SLEEP=2" + "\u000D" + "\u000A")
	}
    	else {
	        serial.writeString("AT+SLEEP=0" + "\u000D" + "\u000A")
	}
    	basic.pause(1000)
    }
    
    //% blockId=Upload_ThingSpeak block="Upload ThingSpeak|API Keys %apikey|Field1 %f1|Field2 %f2|Field3 %f3|Field4 %f4|Field5 %f5|Field6 %f6|Field7 %f7|Field8 %f8"
    //% weight=10
    export function IC_ThingSpeak(apikey: string, f1: number, f2: number, f3: number, f4: number, f5: number, f6: number, f7: number, f8: number): void {
    	let printT2 = "AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",80"
    	serial.writeString(printT2 + "\u000D" + "\u000A")
    	basic.pause(4000)
    	let printT3 = "GET /update?key=" + apikey + "&field1=" + f1 + "&field2=" + f2 + "&field3=" + f3 + "&field4=" + f4 + "&field5=" + f5 + "&field6=" + f6 + "&field7=" + f7 + "&field8=" + f8
    	let printT4 = "AT+CIPSEND=" + (printT3.length + 2)
    	serial.writeString(printT4 + "\u000D" + "\u000A")
    	basic.pause(1000)
    	serial.writeString(printT3 + "\u000D" + "\u000A")
    	basic.pause(1000)
    }
	
/**
* PMS3003 air sensor
*/
    export enum Apin {
        //% block="I3 (TX:P13,RX:P14)"
        Ap1 = 1,
        //% block="I4 (TX:P15,RX:P16)"
        Ap2 = 2,
        //% block="I8 (TX:P1,RX:P2)"
        Ap6 = 3,
    }
    
    export enum PMS {
        //% block="PM1.0"
        pms1 = 1,
        //% block="PM2.5"
        pms2 = 2,
	//% block="PM10"
        pms3 = 3,
    }
	
    let PMcount = 0
    let PMnum = 0
    let Smooth: Buffer = null
    let Head: Buffer = null
    let G3PM100 = 0
    let G3PM10 = 0
    let G3PM25 = 0
    
    //% blockId=PMS3003_SET block="PMS3003 Low Power Mode|pin %apin|set %ch"
    //% weight=10
	export function PMS3003_SET(apin: Apin = 1, ch: CH = 2): void { 
	    let set_mode = 1
	    if(ch ==1) {
	    	set_mode = 0
	    }
	    else {
	    	set_mode = 1
	    }
	    if(apin == 1) {
		pins.digitalWritePin(DigitalPin.P14, set_mode)
	    }
	    else if(apin == 2) {
		pins.digitalWritePin(DigitalPin.P16, set_mode)
	    }
	    else {
		pins.digitalWritePin(DigitalPin.P2, set_mode)
	    }	
	}

// 	//% blockId=Mbitbot_PMS3003 block="PMS3003|pin %apin|get %pms"
// 	//% weight=10
// 	export function IC_PMS3003(apin: Apin = 1, pms: PMS = 1): number { 
// 		if(apin == 1) {
// 			serial.redirect(SerialPin.P14,SerialPin.P13,BaudRate.BaudRate9600)
// 		}
// 		else if(apin == 2) {
// 			serial.redirect(SerialPin.P16,SerialPin.P15,BaudRate.BaudRate9600)
// 		}
// 		else {
// 			serial.redirect(SerialPin.P2,SerialPin.P1,BaudRate.BaudRate9600)
// 		}
// 		basic.pause(100)
// 		Smooth = serial.readBuffer(20)
// 		Head = serial.readBuffer(32)
// 		while(true) {
// 			PMnum = Head.getNumber(NumberFormat.Int8LE, PMcount)
// 			if (PMnum == 66) {
// 				PMnum = Head.getNumber(NumberFormat.Int8LE, PMcount + 1)
// 				if (PMnum == 77) {
// 					Head.shift(PMcount)
// 					G3PM10 = Head[10] * 256 + Head[11]
// 					G3PM25 = Head[12] * 256 + Head[13]
// 					G3PM100 = Head[14] * 256 + Head[15]
// 					break
// 				}
// 			}
// 			PMcount = PMcount + 1
// 			if (PMcount > 20) {
// 				break
// 			}
// 		}
// 		serial.redirectToUSB()
// 		basic.pause(100)
// 		PMcount = 0

// 		if(pms == 1) {
// 			return G3PM10
// 		}
// 		else if(pms == 2) {
// 			return G3PM25
// 		}
// 		else {
// 			return G3PM100
// 		}	 
// 	}
	
	let TG3PM100 = 0
    let TG3PM10 = 0
    let TG3PM25 = 0
	//% blockId=Read_Mbitbot_PMS3003 block="Read PMS3003|pin %apin"
	//% weight=10
	export function TIC_PMS3003(apin: Apin = 1): void {
		if(apin == 1) {
			serial.redirect(SerialPin.P14,SerialPin.P13,BaudRate.BaudRate9600)
		}
		else if(apin == 2) {
			serial.redirect(SerialPin.P16,SerialPin.P15,BaudRate.BaudRate9600)
		}
		else {
			serial.redirect(SerialPin.P2,SerialPin.P1,BaudRate.BaudRate9600)
		}
		basic.pause(100)
		Smooth = serial.readBuffer(20)
		Head = serial.readBuffer(32)
		while(true) {
			PMnum = Head.getNumber(NumberFormat.Int8LE, PMcount)
			if (PMnum == 66) {
				PMnum = Head.getNumber(NumberFormat.Int8LE, PMcount + 1)
				if (PMnum == 77) {
					Head.shift(PMcount)
					TG3PM10 = Head[10] * 256 + Head[11]
					TG3PM25 = Head[12] * 256 + Head[13]
					TG3PM100 = Head[14] * 256 + Head[15]
					break
				}
			}
			PMcount = PMcount + 1
			if (PMcount > 5) {
				break
			}
		}
		serial.redirectToUSB()
		basic.pause(100)
		PMcount = 0	 
	}
	
	//% blockId=_Mbitbot_PMS3003 block="Get PMS3003|get %pms"
	//% weight=10
	export function RIC_PMS3003(pms: PMS = 1): number {
		if(pms == 1) {
			return TG3PM10
		}
		else if(pms == 2) {
			return TG3PM25
		}
		else {
			return TG3PM100
		}
	}

    
    /**
 * DHT11
 */
export enum THpin {
    //% block="I3 (P13,P14)"
    THI3 = 1,
    //% block="I4 (P15,P16)"
    THI4 = 2,
    //% block="I5 (P5,P11)"
    THI5 = 3,
    //% block="I8 (P1,P2)"
    THI8 = 4,
}
    
export enum TH {
    //% block="Temp"
    TH1 = 1,
    //% block="Humi"
    TH2 = 2,
}
let DHT_count = 0
let DHT_value = 0
let DHT_out = 0
let DHT_Temp = 0
let DHT_Humi = 0
let DHTpin = DigitalPin.P1

function Ready(): number {
    pins.digitalWritePin(DHTpin, 0)
    basic.pause(20)
    pins.digitalWritePin(DHTpin, 1)
    DHT_count = input.runningTimeMicros()
    while (pins.digitalReadPin(DHTpin) == 1) {
	if (input.runningTimeMicros() - DHT_count > 100) {
            return 0
        }
    }
    DHT_count = input.runningTimeMicros()
    while (pins.digitalReadPin(DHTpin) == 0) {
        if (input.runningTimeMicros() - DHT_count > 100) {
            return 0
        }
    }
    DHT_count = input.runningTimeMicros()
    while (pins.digitalReadPin(DHTpin) == 1) {
        if (input.runningTimeMicros() - DHT_count > 100) {
            return 0
        }
    }
    return 1
}

function ReadData() {
    DHT_value = 0
    if (Ready() == 1) {
        for (let k = 0; k < 24; k++) {
            DHT_out = 0
            while (pins.digitalReadPin(DHTpin) == 0) {
                DHT_out += 1
                if (DHT_out > 100) {
                    break
                }
            }
            DHT_count = input.runningTimeMicros()
            DHT_out = 0
            while (pins.digitalReadPin(DHTpin) == 1) {
                DHT_out += 1
                if (DHT_out > 100) {
                    break
                }
            }
            if (input.runningTimeMicros() - DHT_count > 40) {
                DHT_value = DHT_value + (1 << (23 - k));
                DHT_Temp = (DHT_value & 0x0000ffff)
                DHT_Humi = (DHT_value >> 16)
            }
        }
    }
    else {
        pins.digitalWritePin(DHTpin, 1)
    }
}
	
//% blockId=Mbitbot_DHT11 block="DHT11|pin %thpin|get %th"
//% weight=10
export function DHT11(thpin: THpin = 1, th: TH = 1): number {
    if(thpin == 1) {
        DHTpin = DigitalPin.P13
    }
    else if(thpin == 2) {
        DHTpin = DigitalPin.P15
    }
    else if(thpin == 3) {
        DHTpin = DigitalPin.P5
    }
    else {
        DHTpin = DigitalPin.P1
    }
    ReadData()
	basic.pause(100)
    if(th == 1) {
        return DHT_Temp
    }
    else { 
        return DHT_Humi
    } 
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

    //HC-SR04
    //% blockId=HCSR04 block="HCSR04 trig %trig|echo %echo"
    //% weight=10
    export function HCSR04(trig: DigitalPin, echo: DigitalPin): number {
	let distance = 0
        pins.setPull(trig, PinPullMode.PullNone);
    	pins.digitalWritePin(trig, 1);
    	control.waitMicros(1000)
    	pins.digitalWritePin(trig, 0);
    	distance = pins.pulseIn(echo, PulseValue.High)
    	return distance = Math.round(distance / 2 / 29)
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
	
    
	
    /**
     * CIRCUS Vibration
    */
    export enum Vibpin {
        //% block="I3 (P13,P14)"
        VibI3 = 1,
        //% block="I4 (P15,P16)"
        VibI4 = 2,
        //% block="I5 (P5,P11)"
        VibI5 = 3,
        //% block="I6 (P9,P7)"
        VibI6 = 4,
        //% block="I7 (P3,P4)"
        VibI7 = 5,
        //% block="I8 (P1,P2)"
        VibI8 = 6,
    }
    //% blockId=CIRCUS_Vibration block="Vibration|pin %vibpin"
    //% weight=10
    export function Vibration(vibpin: Vibpin): number {
	pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        let VIBpin = pins.digitalReadPin(DigitalPin.P13)
        switch (vibpin) {
            case 1: pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
		VIBpin = pins.digitalReadPin(DigitalPin.P13)
                break;
            case 2: pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
		VIBpin = pins.digitalReadPin(DigitalPin.P15)
                break;
            case 3: pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
		VIBpin = pins.digitalReadPin(DigitalPin.P5)
                break;
            case 4: pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
		VIBpin = pins.digitalReadPin(DigitalPin.P9)
                break;
            case 5: pins.setPull(DigitalPin.P3, PinPullMode.PullUp)
		VIBpin = pins.digitalReadPin(DigitalPin.P3)
                break;
            case 6: pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
		VIBpin = pins.digitalReadPin(DigitalPin.P1)
                break;
        }
        return VIBpin
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
