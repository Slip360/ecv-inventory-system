use std::{fs, path::PathBuf};

use sea_orm::{ConnectionTrait, Database, DatabaseConnection, Schema};

use crate::entities::{product, stock};

pub struct DbState(pub DatabaseConnection);

pub async fn init_db(mut data_dir: PathBuf) -> DatabaseConnection {
    fs::create_dir_all(&data_dir).expect("No se pudo crear el directorio de datos");
    data_dir.push("ecv_inventory_db");
    let db_url = format!("sqlite://{}?mode=rwc", data_dir.to_string_lossy());
    let db = Database::connect(&db_url)
        .await
        .expect("Error al conectar SQLite");
    let builder = db.get_database_backend();
    let schema = Schema::new(builder);
    let stmt_product = builder.build(
        schema
            .create_table_from_entity(product::Entity)
            .if_not_exists(),
    );
    let stmt_stock = builder.build(
        schema
            .create_table_from_entity(stock::Entity)
            .if_not_exists(),
    );
    db.execute(stmt_product)
        .await
        .expect("Error al crear la tabla de productos");
    db.execute(stmt_stock)
        .await
        .expect("Error al crear la tabla de stocks");
    db
}
