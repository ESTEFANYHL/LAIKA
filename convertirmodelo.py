import tensorflowjs as tfjs
import tensorflow as tf
from keras.models import load_model

# Cargar el modelo en formato .h5
model = load_model('modelo_perros.h5')

# Convertir el modelo a TensorFlow.js
tfjs.converters.save_keras_model(model, 'carpsal')  # El directorio de salida
