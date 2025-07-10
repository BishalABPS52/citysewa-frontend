'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MessageProviderDialog from '@/components/dialogs/customer/MessageProviderDialog'

export default function CustomerMessagesPage() {
  // Dialog states
  const router = useRouter()
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [activeConversation, setActiveConversation] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')

  // Mock messages data
  const [conversations, setConversations] = useState([
    {
      id: '1',
      providerName: 'Ram Sharma',
      providerService: 'Plumbing',
      lastMessage: "I'll be there at 2 PM tomorrow as discussed.",
      lastMessageDate: '2025-06-29',
      unread: true,
      avatar: "https://ui-avatars.com/api/?name=Ram+Sharma&background=random",
      messages: [
        { id: 1, sender: 'provider', text: "Hello! I see you've booked a plumbing service. How can I help?", time: '2025-06-28T09:30:00' },
        { id: 2, sender: 'customer', text: "Hi! My kitchen sink is leaking. When can you come to fix it?", time: '2025-06-28T09:45:00' },
        { id: 3, sender: 'provider', text: "I can come tomorrow at 2 PM. Would that work for you?", time: '2025-06-28T10:00:00' },
        { id: 4, sender: 'customer', text: "Yes, that works perfectly. Thank you!", time: '2025-06-28T10:15:00' },
        { id: 5, sender: 'provider', text: "I'll be there at 2 PM tomorrow as discussed.", time: '2025-06-29T08:30:00' },
      ]
    },
    {
      id: '2',
      providerName: 'Sita Patel',
      providerService: 'House Cleaning',
      lastMessage: 'Thank you for the review! Let me know if you need cleaning services again.',
      lastMessageDate: '2025-06-20',
      unread: false,
      avatar: "https://ui-avatars.com/api/?name=Sita+Patel&background=random",
      messages: [
        { id: 1, sender: 'provider', text: "Hello! I've completed the house cleaning service. I hope everything is to your satisfaction.", time: '2025-06-19T14:30:00' },
        { id: 2, sender: 'customer', text: "Yes, everything looks great! Thank you for your thorough work.", time: '2025-06-19T15:00:00' },
        { id: 3, sender: 'provider', text: "Thank you for the review! Let me know if you need cleaning services again.", time: '2025-06-20T10:00:00' },
      ]
    },
    {
      id: '3',
      providerName: 'Hari Kumar',
      providerService: 'Electrical Services',
      lastMessage: 'The circuit breaker might need replacement. I can check that for you next time.',
      lastMessageDate: '2025-06-15',
      unread: false,
      avatar: "https://ui-avatars.com/api/?name=Hari+Kumar&background=random",
      messages: [
        { id: 1, sender: 'customer', text: "Hi, I've been having issues with my electricity. The lights keep flickering.", time: '2025-06-15T11:00:00' },
        { id: 2, sender: 'provider', text: "That could be due to several reasons. I'll need to check your electrical panel.", time: '2025-06-15T11:30:00' },
        { id: 3, sender: 'customer', text: "When can you come to take a look?", time: '2025-06-15T12:00:00' },
        { id: 4, sender: 'provider', text: "The circuit breaker might need replacement. I can check that for you next time.", time: '2025-06-15T12:05:00' },
      ]
    },
  ])

  // Handle opening the message dialog
  const handleOpenMessageDialog = (provider) => {
    setSelectedProvider(provider)
    setIsMessageDialogOpen(true)
  }

  // Handle sending a message
  const handleSendMessage = ({ recipient, message }) => {
    // In a real app, this would send the message to an API
    console.log(`Message sent to ${recipient}: ${message}`)
    
    // Update the conversation with the new message
    if (activeConversation) {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === activeConversation.id) {
          const newMessage = {
            id: conv.messages.length + 1,
            sender: 'customer',
            text: message,
            time: new Date().toISOString()
          }
          
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: message,
            lastMessageDate: new Date().toISOString().split('T')[0]
          }
        }
        return conv
      })
      
      setConversations(updatedConversations)
      
      // Refresh the active conversation
      const updatedActiveConversation = updatedConversations.find(conv => conv.id === activeConversation.id)
      setActiveConversation(updatedActiveConversation)
    }
    
    setNewMessage('')
  }

  // Handle sending message from the input field
  const handleSendMessageFromInput = (e) => {
    e.preventDefault()
    if (newMessage.trim() && activeConversation) {
      handleSendMessage({
        recipient: activeConversation.providerName,
        message: newMessage.trim()
      })
    }
  }

  // Mark conversation as read when selected
  const handleSelectConversation = (conversation) => {
    if (conversation.unread) {
      const updatedConversations = conversations.map(conv => 
        conv.id === conversation.id ? { ...conv, unread: false } : conv
      )
      setConversations(updatedConversations)
    }
    setActiveConversation(conversation)
  }

  // Format date for display
  const formatMessageDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Filter conversations based on search query
  const filteredConversations = searchQuery 
    ? conversations.filter(conv => 
        conv.providerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        conv.providerService.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <Button 
          variant="outline"
          onClick={() => setActiveConversation(null)}
          className={!activeConversation ? 'hidden' : ''}
        >
          Back to All Messages
        </Button>
      </div>

      {!activeConversation ? (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid gap-4">
            {filteredConversations.map((conversation) => (
              <Card 
                key={conversation.id} 
                className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${conversation.unread ? 'border-l-4 border-l-cityserve-pink' : ''}`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={conversation.avatar} 
                          alt={conversation.providerName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center">
                          {conversation.providerName}
                          {conversation.unread && (
                            <span className="ml-2 w-2 h-2 rounded-full bg-cityserve-pink"></span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{conversation.providerService}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(conversation.lastMessageDate).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">
                    {conversation.lastMessage}
                  </p>
                </CardContent>
              </Card>
            ))}

            {filteredConversations.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No conversations found.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader className="pb-3 bg-muted/50">
            <CardTitle className="text-xl flex items-center">
              <div 
                className="w-8 h-8 rounded-full overflow-hidden mr-3 cursor-pointer"
                onClick={() => router.push(`/dashboard/user/${activeConversation.id}`)}
              >
                <img 
                  src={activeConversation.avatar} 
                  alt={activeConversation.providerName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="cursor-pointer" onClick={() => router.push(`/dashboard/user/${activeConversation.id}`)}>
                {activeConversation.providerName}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({activeConversation.providerService})
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === 'customer' 
                          ? 'bg-cityserve-pink text-white' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'customer' ? 'text-pink-100' : 'text-muted-foreground'}`}>
                        {formatMessageDate(message.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessageFromInput} className="flex gap-2">
                  <Input 
                    placeholder="Type your message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-cityserve-pink hover:bg-cityserve-pink/90"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Dialog */}
      <MessageProviderDialog
        isOpen={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        recipient={selectedProvider}
        onSend={handleSendMessage}
      />
    </div>
  )
}
