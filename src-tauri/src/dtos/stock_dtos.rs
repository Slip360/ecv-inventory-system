use serde::{Deserialize, Serialize};

use crate::entities::{product, stock};

#[derive(Deserialize)]
pub struct CreateStockDto {
    pub product_id: i32,
    pub quantity: i64,
}

#[derive(Deserialize)]
pub struct UpdateStockDto {
    pub id: i32,
    pub quantity: i64,
}

#[derive(Serialize)]
pub struct StockWithProductDto {
    #[serde(flatten)]
    pub stock: stock::Model,
    pub product: Option<product::Model>,
}
