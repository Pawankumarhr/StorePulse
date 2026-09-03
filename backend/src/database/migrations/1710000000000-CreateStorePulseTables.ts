import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStorePulseTables1710000000000 implements MigrationInterface {
  name = 'CreateStorePulseTables1710000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(400) NOT NULL,
        role ENUM('ADMIN', 'NORMAL_USER', 'STORE_OWNER') NOT NULL DEFAULT 'NORMAL_USER',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE KEY UQ_users_email (email),
        INDEX IDX_users_role (role),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE stores (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(400) NOT NULL,
        owner_id INT NOT NULL,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        UNIQUE KEY UQ_stores_owner_id (owner_id),
        INDEX IDX_stores_owner_id (owner_id),
        PRIMARY KEY (id),
        CONSTRAINT FK_stores_owner_id FOREIGN KEY (owner_id) REFERENCES users (id)
          ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE ratings (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        store_id INT NOT NULL,
        rating TINYINT UNSIGNED NOT NULL,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE KEY UQ_ratings_user_store (user_id, store_id),
        PRIMARY KEY (id),
        CONSTRAINT CHK_ratings_rating_range CHECK (rating BETWEEN 1 AND 5),
        CONSTRAINT FK_ratings_user_id FOREIGN KEY (user_id) REFERENCES users (id)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_ratings_store_id FOREIGN KEY (store_id) REFERENCES stores (id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE ratings');
    await queryRunner.query('DROP TABLE stores');
    await queryRunner.query('DROP TABLE users');
  }
}
