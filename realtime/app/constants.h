#ifndef _CONSTANTS_H_
#define _CONSTANTS_H_

//Steinhart-Hart coefficients for heat block thermistor (QTI Z Curve)
const double kQTICurveZThermistorACoefficient = 0.001116401465500;
const double kQTICurveZThermistorBCoefficient = 0.000237982973213;
const double kQTICurveZThermistorCCoefficient = -0.000000372283234;
const double kQTICurveZThermistorDCoefficient = 0.000000099063233;

//thermistor & ADC params
const unsigned int kThermistorVoltageDividerResistanceOhms = 6800;
const int kLTC2444ADCBits = 24;

#endif