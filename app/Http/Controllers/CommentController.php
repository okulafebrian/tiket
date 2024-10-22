<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $comment = Comment::create([
            'ticket_id' => $request->ticket_id,
            'user_id' => Auth::id(),
            'description' => $request->description,
        ]);

        if (count($request->attachments) > 0) {
            foreach ($request->attachments as $attachment) {
                $comment->addMedia($attachment)->toMediaCollection('attachments');
            }
        }

        return back();
    }

    public function show(Comment $comment)
    {
        //
    }

    public function edit(Comment $comment)
    {
        //
    }

    public function update(Request $request, Comment $comment)
    {
        //
    }

    public function destroy(Comment $comment)
    {
        //
    }
}
