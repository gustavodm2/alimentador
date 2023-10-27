#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Servo.h>

const char* ssid = "-___-";
const char* password = "vagalume321";

const char* mqttServer = "192.168.0.192";
const int mqttPort = 1883;

const char* clientId = "arduino-esp8266";

const char* topic = "arduino-data";

WiFiClient espClient; 
PubSubClient client(espClient);

String variableValue = "0"; 
Servo towerprosg5010;

int pos = 0; 

void setup() {
  // hw_wdt_disable();

  towerprosg5010.write(0);
  towerprosg5010.attach(3);

  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  // delay(2000);
}

void loop() {

  int varNum = variableValue.toInt();
  if( varNum == 1){
    for (pos = 0; pos <= 180;pos += 1) {
      Serial.println(pos);
      towerprosg5010.write(pos);
      delay(15); 
    }
    delay(1000);
    for (pos = 90; pos > 180; pos -= 1) {
      Serial.println(pos);
      towerprosg5010.write(pos);
      delay(15); 
    }
  }
  delay(3000);
  variableValue = "0";
  if (!client.connected()) {
    reconnect();
  }
  Serial.println(variableValue);
  delay(1000);
  client.loop();
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);

  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.println("Message: " + message);
  variableValue = message;
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(clientId)) {
      Serial.println("connected");
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

// void hw_wdt_disable(){
//   *((volatile uint32_t*) 0x60000900) &= ~(1);
// }