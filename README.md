# 🎓 Student Stress & Burnout Analyzer

*A real-time, privacy-first web application to evaluate student stress and burnout using academic, lifestyle, and mental-health indicators — with zero data storage.*

🔗 **Live Demo:** [https://burnout-wu2b.onrender.com/](https://burnout-wu2b.onrender.com/)

---

## 🌟 Why This Project?

Student burnout is rising due to academic pressure, poor sleep, screen overuse, and anxiety.

This project provides a **transparent, fast, and ethical** way to assess stress levels and guide students toward healthier habits — without compromising privacy.

---

## 📌 Project Overview

The **Student Stress & Burnout Analyzer** collects **10 key indicators**, including:

* Sleep duration
* Academic workload
* CGPA
* Anxiety levels
* Screen time
* Physical activity

Using a **normalized weighted scoring model**, the system:

* Calculates burnout score (0–100)
* Classifies stress level
* Identifies high-risk factors
* Provides personalized recommendations

All calculations are executed **client-side only**.

---

## 🚀 Features

* 📊 Real-time stress scoring
* 🧠 Multi-dimensional health assessment
* ⚠️ High-risk indicator detection
* 📈 Personalized wellness suggestions
* 📱 Responsive modern UI

---

## 🧮 Scoring Method

The algorithm follows three steps:

1. Normalize all inputs to a standard scale
2. Apply weighted importance to each factor
3. Aggregate into final burnout score

This ensures:

* Fair comparison across inputs
* Explainable results

---


## 📊 Stress Level Scale

| Score Range | Category        |
| ----------- | --------------- |
| 0 – 30      | Low Stress      |
| 31 – 60     | Moderate Stress |
| 61 – 80     | High Stress     |
| 81 – 100    | Severe Burnout  |

---

## ▶️ Installation & Usage

### Clone the repository

```
git clone https://github.com/Divya-tech06/Burnout.git
cd Burnout
```

### Install packages

```
npm install
```

### Start application

```
node index.js
```

### Open in browser

Enter values and click **Analyze Stress**

---


## 📈 Future Improvements

* 📱 Mobile app version
* 📊 Burnout trend tracking
* 🧠 Advanced analytics
* 🏫 Integration with wellness systems
* 📈 Visual dashboards

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature-name`)
3. Commit your changes
4. Open a Pull Request

---
