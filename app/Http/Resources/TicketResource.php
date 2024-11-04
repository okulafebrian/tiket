<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => TicketCategoryResource::make($this->category),
            'status' => StatusResource::make($this->status),
            'user' => $this->user,
            'department' => DepartmentResource::make($this->whenLoaded('department')),
            'topic' => TopicResource::make($this->whenLoaded('topic')),
            'location' => LocationResource::make($this->whenLoaded('location')),
            'reference_number' => $this->reference_number,
            'description' => $this->description,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'assignees' => UserResource::collection($this->whenLoaded('assignees')),
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}
