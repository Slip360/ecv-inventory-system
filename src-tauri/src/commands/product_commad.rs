use crate::dtos::product_dtos::CreateProductDto;
use crate::entities::product;
use crate::{database::init::DbState, dtos::product_dtos::UpdateProductDto};
use sea_orm::{ActiveModelTrait, EntityTrait, Set};
use tauri::State;

#[tauri::command]
pub async fn create_product(
    state: State<'_, DbState>,
    payload: CreateProductDto,
) -> Result<product::Model, String> {
    let new_product = product::ActiveModel {
        name: Set(payload.name),
        unit_of_measurement: Set(payload.unit_of_measurement),
        price: Set(payload.price),
        ..Default::default()
    };
    let db = &state.0;
    new_product.insert(db).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_products(state: State<'_, DbState>) -> Result<Vec<product::Model>, String> {
    let db = &state.0;
    product::Entity::find()
        .all(db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_product(
    state: State<'_, DbState>,
    payload: UpdateProductDto,
) -> Result<product::Model, String> {
    let new_product = product::ActiveModel {
        name: Set(payload.name),
        unit_of_measurement: Set(payload.unit_of_measurement),
        price: Set(payload.price),
        id: Set(payload.id),
    };
    let db = &state.0;
    new_product.update(db).await.map_err(|e| e.to_string())
}
