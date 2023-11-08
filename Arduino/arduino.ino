#include <WiFi.h>
#include <PubSubClient.h>
#include <ESP32Servo.h>
#include "HX711.h"
#include "secrets.h" // Neste arquivo estão coisas como senhas, ssid do wifi, ips e coisas que as pessoas nao devem ver

// Portas para o modulo de carga
#define  LOADCELL_DOUT_PIN  14    
#define  LOADCELL_SCK_PIN  12  

// variaveis para o modulo de carga
const long LOADCELL_OFFSET = 50682624;
const long LOADCELL_DIVIDER = 5895655;

float calibration_factor = -50; // fator para calibragem
float units;

HX711 scale;
WiFiClient espClient;
PubSubClient client(espClient);

Servo servo;

String messageReceived = "0";
void setup() {
  // Tipo um attach para a carga
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);

  scale.tare();  //Reseta a escala para 0

  Serial.begin(115200);
  // Conecta o WiFi
  setup_wifi();
  // Conecta o mqtt
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}

void loop() {
  scale.set_scale(calibration_factor); //calibra a carga

  // calculos para a carga
  units = scale.get_units(), 10;
  if (units < 0)
  {
    units = 0.00;
  }

  // Prints para debug
  Serial.print(units);
  Serial.print(" units"); 
  Serial.print(" calibration_factor: ");
  Serial.print(calibration_factor);
  Serial.println();

  // vai executar este codigo se receber a mesagem 1 e a carga for menor que 200g
  if (messageReceived == "1" && units < 200) {
    // este servo é "continuo", ele gira infinitamente, o write define a velocidade, entao para parar ele, temos que usar detach()
    servo.attach(13);
    servo.write(0);
    delay(310);
    servo.detach();
    delay(1000);
    servo.attach(13);
    servo.write(0);
    delay(310);
    servo.detach();
  }
  delay(3000);
  messageReceived = "0";
  if (!client.connected()) {
    reconnect();
  }
  Serial.println("Valor da var: ");
  Serial.println(messageReceived);
  delay(1000);
  client.loop();
}

// função para conectar no WiFi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando no WiFi ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
}

//Função para receber mensagens
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensagem recebida: ");
  Serial.println(topic);

  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.println("Message: " + message);
  messageReceived = message;
}


// Conectar ao MQTT
void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conexão com MQTT...");
    if (client.connect(clientId, mqtt_username, mqtt_password)) {
      Serial.println("conectado");
      client.subscribe(topic);
    } else {
      Serial.print("falhou, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

