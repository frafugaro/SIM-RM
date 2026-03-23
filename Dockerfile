# Usa un'immagine Java moderna e stabile (Eclipse Temurin)
FROM eclipse-temurin:17-jdk-jammy

# Copia i file nel server
COPY . /app
WORKDIR /app

# Compila il file Java
RUN javac BlochSimulator.java

# Avvia il server leggendo la porta dinamica
CMD ["java", "BlochSimulator"]
