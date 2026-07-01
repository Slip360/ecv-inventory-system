use crate::database::init::DbState;
use crate::dtos::stock_dtos::{CreateStockDto, UpdateStockDto};
use crate::entities::stock;
use sea_orm::{ActiveModelTrait, EntityTrait, Set};
use tauri::State;

#[tauri::command]
pub async fn create_stock(
    state: State<'_, DbState>,
    payload: CreateStockDto,
) -> Result<stock::Model, String> {
    let new_stock = stock::ActiveModel {
        product_id: Set(payload.product_id),
        quantity: Set(payload.quantity),
        ..Default::default()
    };
    let db = &state.0;
    new_stock.insert(db).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_stocks(state: State<'_, DbState>) -> Result<Vec<stock::Model>, String> {
    let db = &state.0;
    stock::Entity::find()
        .all(db)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_stock(
    state: State<'_, DbState>,
    payload: UpdateStockDto,
) -> Result<stock::Model, String> {
    let new_stock = stock::ActiveModel {
        quantity: Set(payload.quantity),
        id: Set(payload.id),
        ..Default::default()
    };
    let db = &state.0;
    new_stock.update(db).await.map_err(|e| e.to_string())
}
