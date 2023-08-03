import pickle
import pandas as pd
import numpy as np

def load():
    path = "app/ml_model/model.pickle"
    with open(path , 'rb') as f:
        model = pickle.load(f)
    return model

def predict(bedroom, total_sqft, bath, balcony, location , model):
    features_path = "app/ml_model/model_features.csv"
    df_features = pd.read_csv(features_path)
    location_index = np.where(df_features.columns == location)[0][0]
    
    x = np.zeros(len(df_features.columns))
    x[0] = bedroom
    x[1] = total_sqft
    x[2] = bath
    x[3] = balcony
    
    x[location_index] = 1
    
    return np.exp(model.predict([x])[0])



