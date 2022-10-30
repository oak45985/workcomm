import React from 'react';

function MessageInput() {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>    
            <div>
                <div></div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea type='text' placeholder='Message'></textarea>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default MessageInput;