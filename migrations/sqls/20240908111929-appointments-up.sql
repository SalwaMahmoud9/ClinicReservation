CREATE TABLE IF NOT EXISTS appointments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    doctor_id INTEGER REFERENCES doctors(id) NOT NULL,
    patient_id INTEGER REFERENCES patients(id) NOT NULL,
    clinic_id INTEGER REFERENCES clinics(id) NOT NULL,
    date Date NOT NULL,   
    description VARCHAR(255),
    Diagnosis VARCHAR(255)
    );