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
}
