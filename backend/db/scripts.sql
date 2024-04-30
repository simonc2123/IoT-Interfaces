CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    home INT(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO users (username, password, home, rol) VALUES ('admin1', 'admin1', '', 'admin');
INSERT INTO users (username, password, home, rol) VALUES ('bombero1', 'bombero1', '', 'bombero');
INSERT INTO users (username, password, home, rol) VALUES ('vigilante1', 'vigilante1', '', 'vigilante');
INSERT INTO users (username, password, home, rol) VALUES ('usuario1', 'usuario1', '1', 'usuario');
INSERT INTO users (username, password, home, rol) VALUES ('usuario2', 'usuario2', '2', 'usuario');