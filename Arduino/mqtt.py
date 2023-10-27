import paho.mqtt.client as mqtt

# Define the MQTT broker and topic
broker_address = "192.168.0.192"
port = 1883
topic = "arduino-data"

# Create an MQTT client 
client = mqtt.Client("PythonPublisher")

# Connect to the MQTT broker
client.connect(broker_address, port)

# Variable value to send to Arduino
variable_value = "1"

# Publish the variable value to the topic
client.publish(topic, variable_value)

# Disconnect from the broker
client.disconnect()

