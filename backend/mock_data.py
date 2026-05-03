# SPDX-License-Identifier: AGPL-3.0-only
# Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

from datetime import datetime, timedelta
import random
from typing import List, Dict, Any, Optional
from models import (
    TrainingRunSummary,
    TrainingRunListResponse,
    TrainingRunDetailResponse,
    TrainingRunMetrics,
    LocalModelInfo,
    LocalModelListResponse,
    LoRAInfo,
    LoRAScanResponse,
    CheckpointInfo,
    CheckpointListResponse,
    ModelCheckpoints,
    ModelDetails,
    ModelListResponse,
)
from models.datasets import LocalDatasetItem, LocalDatasetsResponse

def get_mock_runs():
    now = datetime.now()
    return TrainingRunListResponse(
        runs = [
            TrainingRunSummary(
                id = "run_active_1",
                status = "running",
                model_name = "unsloth/llama-3-8b-bnb-4bit",
                dataset_name = "alpaca-cleaned",
                started_at = (now - timedelta(minutes=45)).isoformat(),
                total_steps = 1000,
                final_step = 450,
                final_loss = 0.85,
                loss_sparkline = [1.2, 1.1, 1.0, 0.95, 0.9, 0.88, 0.85],
            ),
            TrainingRunSummary(
                id = "run_completed_1",
                status = "completed",
                model_name = "unsloth/Qwen2.5-7B-Instruct-bnb-4bit",
                dataset_name = "code-alpaca-v2",
                started_at = (now - timedelta(days=1)).isoformat(),
                ended_at = (now - timedelta(days=1) + timedelta(hours=2)).isoformat(),
                total_steps = 500,
                final_step = 500,
                final_loss = 0.42,
                duration_seconds = 7200,
                loss_sparkline = [1.5, 1.2, 0.9, 0.7, 0.6, 0.5, 0.45, 0.42],
            ),
            TrainingRunSummary(
                id = "run_failed_1",
                status = "error",
                model_name = "unsloth/Phi-3.5-mini-instruct",
                dataset_name = "ultra-chat",
                started_at = (now - timedelta(hours=5)).isoformat(),
                ended_at = (now - timedelta(hours=4, minutes=55)).isoformat(),
                total_steps = 2000,
                final_step = 12,
                final_loss = 2.5,
                error_message = "CUDA out of memory. Tried to allocate 12.50 GiB (GPU 0; 23.65 GiB total capacity; 18.20 GiB already allocated; 4.12 GiB free; 19.50 GiB reserved in total by PyTorch)",
                loss_sparkline = [3.0, 2.8, 2.5],
            ),
            TrainingRunSummary(
                id = "run_stopped_1",
                status = "stopped",
                model_name = "unsloth/Mistral-Nemo-Base-2407-bnb-4bit",
                dataset_name = "open-orca",
                started_at = (now - timedelta(hours=10)).isoformat(),
                ended_at = (now - timedelta(hours=8)).isoformat(),
                total_steps = 1000,
                final_step = 250,
                final_loss = 1.1,
                loss_sparkline = [1.8, 1.6, 1.4, 1.2, 1.1],
            ),
        ],
        total = 4
    )

def get_mock_run_detail(run_id: str):
    runs = get_mock_runs().runs
    run = next((r for r in runs if r.id == run_id), runs[0])
    
    # Generate some fake history
    steps = list(range(0, (run.final_step or 0) + 1, 10))
    loss_history = [max(0.2, 1.5 * (0.95 ** (i/10)) + random.uniform(-0.05, 0.05)) for i in steps]
    lr_history = [2e-4 * (1 - i/1000) for i in steps]
    
    return TrainingRunDetailResponse(
        run = run,
        config = {
            "model_name": run.model_name,
            "training_type": "LoRA/QLoRA",
            "learning_rate": "2e-4",
            "num_epochs": 1,
            "batch_size": 2,
            "lora_r": 16,
            "lora_alpha": 32,
            "max_seq_length": 2048,
        },
        metrics = TrainingRunMetrics(
            step_history = steps,
            loss_history = loss_history,
            loss_step_history = steps,
            lr_history = lr_history,
            lr_step_history = steps,
            final_epoch = 0.45 if run.status == "running" else 1.0,
            final_num_tokens = 1250000,
        )
    )

def get_mock_local_models():
    return LocalModelListResponse(
        models_dir = "/mock/models",
        hf_cache_dir = "/mock/hf_cache",
        lmstudio_dirs = ["/mock/lmstudio"],
        models = [
            LocalModelInfo(id="unsloth/llama-3-8b-bnb-4bit", display_name="Llama-3-8B (4-bit)", path="/mock/models/llama-3", source="hf_cache", model_id="unsloth/llama-3-8b-bnb-4bit"),
            LocalModelInfo(id="unsloth/Qwen2.5-7B-Instruct-bnb-4bit", display_name="Qwen-2.5-7B-Instruct", path="/mock/models/qwen-2.5", source="hf_cache", model_id="unsloth/Qwen2.5-7B-Instruct-bnb-4bit"),
            LocalModelInfo(id="unsloth/Phi-3.5-mini-instruct", display_name="Phi-3.5-mini", path="/mock/models/phi-3.5", source="hf_cache", model_id="unsloth/Phi-3.5-mini-instruct"),
            LocalModelInfo(id="my-custom-model", display_name="My Custom Fine-tune", path="/mock/models/custom", source="models_dir"),
            LocalModelInfo(id="gemma-2b.gguf", display_name="Gemma 2B (GGUF)", path="/mock/models/gemma.gguf", source="models_dir"),
        ]
    )

def get_mock_loras():
    return LoRAScanResponse(
        outputs_dir = "/mock/outputs",
        loras = [
            LoRAInfo(display_name="llama-3-alpaca-adapter", adapter_path="/mock/outputs/llama-3-alpaca", base_model="unsloth/llama-3-8b-bnb-4bit", source="training"),
            LoRAInfo(display_name="qwen-code-specialist", adapter_path="/mock/outputs/qwen-code", base_model="unsloth/Qwen2.5-7B-Instruct-bnb-4bit", source="exported", export_type="lora"),
        ]
    )

def get_mock_datasets():
    return LocalDatasetsResponse(
        datasets = [
            LocalDatasetItem(id="ds_1", label="Alpaca Cleaned", path="/mock/data/alpaca.jsonl", rows=52000),
            LocalDatasetItem(id="ds_2", label="Code Feedback", path="/mock/data/code.parquet", rows=15000),
            LocalDatasetItem(id="ds_3", label="ShareGPT Multimodal", path="/mock/data/sharegpt.json", rows=10000),
        ]
    )

def get_mock_checkpoints():
    return CheckpointListResponse(
        outputs_dir = "/mock/outputs",
        models = [
            ModelCheckpoints(
                name = "Llama-3-8B-Finetune-Active",
                base_model = "unsloth/llama-3-8b-bnb-4bit",
                peft_type = "LORA",
                lora_rank = 16,
                is_quantized = True,
                checkpoints = [
                    CheckpointInfo(display_name="checkpoint-100", path="/mock/outputs/run1/checkpoint-100", loss=1.1),
                    CheckpointInfo(display_name="checkpoint-200", path="/mock/outputs/run1/checkpoint-200", loss=0.95),
                    CheckpointInfo(display_name="checkpoint-300", path="/mock/outputs/run1/checkpoint-300", loss=0.88),
                    CheckpointInfo(display_name="final", path="/mock/outputs/run1/final", loss=0.85),
                ]
            )
        ]
    )

def get_mock_hardware_utilization():
    return {
        "devices": [
            {
                "id": 0,
                "name": "NVIDIA GeForce RTX 4090",
                "utilization": 85,
                "memory": {
                    "total": 24576,
                    "used": 18432,
                    "free": 6144
                },
                "temperature": 68
            }
        ]
    }
