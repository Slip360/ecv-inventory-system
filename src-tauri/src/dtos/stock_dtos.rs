use serde::Deserialize;

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
