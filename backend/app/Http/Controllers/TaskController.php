<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Task::with(['creator','assignee']);
        if($request->has('status')){
            $query->where('status', $request->status);
        }
        if($request->has('priority')){
            $query->where('priority', $request->priority);
        }
        if($request->boolean('mine')){
            $query->where('assigned_to',$request->user()->id);
        }

        $task = $query->latest()->get();
        return response()->json($task);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'=>'required|string|max:255',
            'description'=>'nullable|nullable',
            'status'=>'in:a_faire,en_cours,termine',
            'priority'=>'in:basse,normale,haute',
            'assigned_to'=>'nullable|exists:user_id',
            'due_date'=>'nullable|date|after_or_equal:today'
        ]);

        $validated['user_id'] = $request->user()->id;
        $task = Task::create($validated);
        $task->load(['creator','assignee']);
        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): JsonResponse
    {
        $task->load(['creator','assignee']);
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        if($task->user_id !== $request->user()->id){
            return response()->json([
                'message'=> 'Action non autorisé'
            ], 403);
        }
        $validated = $request->validate([
            'title'=>'required|string|max:255',
            'description'=>'nullable|string',
            'status'=>'sometimes|in:a_faire,en_cours,termine',
            'priority'=>'sometimes|in:basse,normale,haute',
            'assigned_to'=>'nullable|exists:user,id',
            'due_date'=>'nullable|date'
        ]);
        $task->update($validated);
        $task->load('creator','assignee');
        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Task $task): JsonResponse
    {
        if(!$task->user_id !== $request->user()->id){
            return response()->json([
                'message'=>'Action non autorisée.'
            ]);
        }
        $task->delete();
        return response()->json([
            'message'=>'Tâche supprimée avec succès'
        ], 200);
    }
}
