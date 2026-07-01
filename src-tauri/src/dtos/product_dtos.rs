use serde::Deserialize;

#[derive(Deserialize)]
pub struct CreateProductDto {
    pub name: String,
    pub unit_of_measurement: String,
    pub price: f64,
}

#[derive(Deserialize)]
pub struct UpdateProductDto {
    pub id: i32,
    pub name: String,
    pub unit_of_measurement: String,
    pub price: f64,
}
