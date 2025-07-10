'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MessageCustomerDialog from '@/components/dialogs/provider/MessageCustomerDialog'

export default function ProviderMessagesPage() {
  // Dialog states
  const router = useRouter()
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [activeConversation, setActiveConversation] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock messages data
  const [conversations, setConversations] = useState([
    {
      id: '1',
      customerName: 'Anil Thapa',
      serviceBooked: 'Deep Cleaning',
      lastMessage: "I'll be available at home at 2 PM tomorrow as discussed.",
      lastMessageDate: '2025-06-29',
      unread: true,
      messages: [
        { id: 1, sender: 'customer', text: "Hi, I've booked a deep cleaning service for tomorrow.", time: '2025-06-28T09:30:00' },
        { id: 2, sender: 'provider', text: "Hello! Yes, I see your booking. What time would be convenient for you?", time: '2025-06-28T09:45:00' },
        { id: 3, sender: 'customer', text: "How about 2 PM?", time: '2025-06-28T10:00:00' },
        { id: 4, sender: 'provider', text: "2 PM works perfectly. I'll be there on time.", time: '2025-06-28T10:15:00' },
        { id: 5, sender: 'customer', text: "I'll be available at home at 2 PM tomorrow as discussed.", time: '2025-06-29T08:30:00' },
      ]
    },
    {
      id: '2',
      customerName: 'Sita Patel',
      serviceBooked: 'Regular Cleaning',
      lastMessage: "Thank you for the great service! I've left a 5-star review.",
      lastMessageDate: '2025-06-20',
      unread: false,
      messages: [
        { id: 1, sender: 'customer', text: "Hello, I wanted to thank you for the cleaning service yesterday.", time: '2025-06-19T14:30:00' },
        { id: 2, sender: 'provider', text: "You're welcome! I'm glad you're happy with the service.", time: '2025-06-19T15:00:00' },
        { id: 3, sender: 'customer', text: "Thank you for the great service! I've left a 5-star review.", time: '2025-06-20T10:00:00' },
      ]
    },
    {
      id: '3',
      customerName: 'Hari Kumar',
      serviceBooked: 'Office Cleaning',
      lastMessage: "Could you provide a quote for weekly office cleaning?",
      lastMessageDate: '2025-06-15',
      unread: false,
      messages: [
        { id: 1, sender: 'customer', text: "Hi there, I'm interested in regular office cleaning services.", time: '2025-06-15T11:00:00' },
        { id: 2, sender: 'provider', text: "Hello! I'd be happy to help. How large is your office space?", time: '2025-06-15T11:30:00' },
        { id: 3, sender: 'customer', text: "It's about 1500 sq ft with 3 separate rooms and a reception area.", time: '2025-06-15T12:00:00' },
        { id: 4, sender: 'customer', text: "Could you provide a quote for weekly office cleaning?", time: '2025-06-15T12:05:00' },
      ]
    },
  ])

  // Handle opening the message dialog
  const handleOpenMessageDialog = (customer) => {
    setSelectedCustomer(customer)
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
            sender: 'provider',
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
        conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        conv.serviceBooked.toLowerCase().includes(searchQuery.toLowerCase())
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
                          src={`https://ui-avatars.com/api/?name=${conversation.customerName.replace(' ', '+')}&background=random`}
                          alt={conversation.customerName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center">
                          {conversation.customerName}
                          {conversation.unread && (
                            <span className="ml-2 w-2 h-2 rounded-full bg-cityserve-pink"></span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{conversation.serviceBooked}</p>
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
            <CardTitle className="text-xl">
              <div className="flex items-center">
                <div 
                  className="w-8 h-8 rounded-full overflow-hidden mr-3 cursor-pointer"
                  onClick={() => router.push(`/dashboard/provider/user/${activeConversation.id}`)}
                >
                  <img 
                    src={`https://ui-avatars.com/api/?name=${activeConversation.customerName.replace(' ', '+')}&background=random`}
                    alt={activeConversation.customerName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="cursor-pointer" onClick={() => router.push(`/dashboard/provider/user/${activeConversation.id}`)}>
                  {activeConversation.customerName}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({activeConversation.serviceBooked})
                  </span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === 'provider' 
                          ? 'bg-cityserve-pink text-white' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'provider' ? 'text-pink-100' : 'text-muted-foreground'}`}>
                        {formatMessageDate(message.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.querySelector('input');
                  if (input.value.trim()) {
                    handleSendMessage({
                      recipient: activeConversation.customerName,
                      message: input.value.trim()
                    });
                    input.value = '';
                  }
                }} className="flex gap-2">
                  <Input 
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button 
                    type="submit"
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
      <MessageCustomerDialog
        isOpen={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        recipient={selectedCustomer}
        onSend={handleSendMessage}
      />
    </div>
  )
}
